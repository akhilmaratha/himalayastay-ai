import connectToDatabase from '../../../src/lib/mongodb';
import Booking from '../../../src/models/Booking';
import Room from '../../../src/models/Room';
import Review from '../../../src/models/Review';
import { successResponse } from '../../../src/lib/response';
import { withErrorHandler } from '../../../src/middleware/errorHandler';

export const GET = withErrorHandler(async () => {
  await connectToDatabase();
  
  const [bookings, rooms, reviews] = await Promise.all([
    Booking.find({}).populate('roomId').sort({ createdAt: -1 }),
    Room.find({}),
    Review.find({})
  ]);

  const totalBookings = bookings.length;
  const totalRooms = rooms.length;
  const totalReviews = reviews.length;
  
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, curr) => acc + (curr.rating || 5), 0) / totalReviews).toFixed(1) 
    : "0.0";
    
  const activeBookings = bookings.filter(b => b.status !== "Cancelled").length;
  const occupancyRate = totalRooms > 0 
    ? Math.min(100, Math.round((activeBookings / totalRooms) * 100)) 
    : 0;

  // Occupancy by room type
  const roomTypes = {};
  rooms.forEach(r => {
    const type = r.type || 'Boutique Stay';
    if (!roomTypes[type]) roomTypes[type] = { total: 0, occupied: 0 };
    roomTypes[type].total += 1;
    if (r.status === 'Occupied') roomTypes[type].occupied += 1;
  });

  const occupancyByRoom = Object.keys(roomTypes).map(type => ({
    name: type,
    occupancy: roomTypes[type].total > 0 
      ? Math.round((roomTypes[type].occupied / roomTypes[type].total) * 100) 
      : 0
  }));

  const chartData = [12, 19, 15, 25, 22, activeBookings];
  
  const avgNightlyRate = rooms.length > 0 
    ? Math.round(rooms.reduce((acc, r) => acc + (r.price || 0), 0) / rooms.length) 
    : 0;
    
  const maintenanceCount = rooms.filter(r => r.status === 'Maintenance').length;

  return successResponse({
    totalBookings,
    totalRooms,
    totalReviews,
    averageRating,
    occupancyRate,
    occupancyByRoom,
    recentBookings: bookings.slice(0, 5),
    chartData,
    avgNightlyRate,
    maintenanceCount
  });
});
