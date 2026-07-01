import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: { type: String, required: true, trim: true },
    dates: { type: String, required: true },
    status: {
      type: String,
      default: 'Confirmed',
      enum: ['Confirmed', 'Pending', 'Cancelled'],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
