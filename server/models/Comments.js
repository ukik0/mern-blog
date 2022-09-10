import mongoose from 'mongoose';

const CommentsModel = new mongoose.Schema(
  {
    comment: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model('Comments', CommentsModel);
