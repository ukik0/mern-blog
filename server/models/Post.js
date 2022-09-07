import mongoose from 'mongoose';

const PostModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    imageUrl: { type: String, default: '' },
    views: { type: Number, default: 0 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
    username: String,
  },
  { timestamps: true },
);

export default mongoose.model('Post', PostModel);
