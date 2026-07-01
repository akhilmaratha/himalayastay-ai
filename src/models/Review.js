import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: { type: String, required: true, trim: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
