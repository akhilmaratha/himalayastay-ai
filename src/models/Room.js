import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    location: { type: String, required: true },
    amenities: { type: [String], default: [] },
    image: { type: String },
    status: { type: String, default: 'Available' },
    availability: { type: Boolean, default: true },
    rating: { type: String, default: '0' },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', roomSchema);
