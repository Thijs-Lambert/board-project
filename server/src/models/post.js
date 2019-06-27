import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  meta: {
    upvotes: Number,
    downvotes:  Number
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
  user: { type: String },
});

const Post = mongoose.model('Post', postSchema);

export default Post;
