import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: { type: String },
    role: { type: String, default: 'user', enum: ['user', 'admin'] },
    provider: { type: String, default: 'credentials' },
    image: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);
