import mongoose, { Document } from 'mongoose';

export interface IdeaDocument extends Document {
  title: string;
  description: string;
  contentType: 'blog' | 'video' | 'social';
  keywords: string[];
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ideaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    contentType: {
      type: String,
      enum: ['blog', 'video', 'social'],
      required: true,
    },
    keywords: [{
      type: String,
      trim: true,
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Idea = mongoose.model<IdeaDocument>('Idea', ideaSchema);

export default Idea;
