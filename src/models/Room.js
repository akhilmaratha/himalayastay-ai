import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    rooms: [
      {
        name: String,
        capacity: Number,
        bedType: String,
        amenities: [String]
      }
    ],
    images: [{ url: String, key: String }],
    price: { type: Number, required: true, min: 0 },
    cancellationPolicy: { type: String, default: 'Flexible' },
    houseRules: {
      petsAllowed: { type: Boolean, default: false },
      smokingAllowed: { type: Boolean, default: false },
      eventsAllowed: { type: Boolean, default: false },
    },
    status: { type: String, default: 'Available' },
    availability: { type: Boolean, default: true },
    rating: { type: String, default: '0' },
  },
  { timestamps: true }
);

export default mongoose.models.Room || mongoose.model('Room', roomSchema);
