import mongoose from 'mongoose';
import { WatchlistItem } from '../types/content';

const WatchlistSchema = new mongoose.Schema<WatchlistItem>({
  contentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
  },
  background_path:{
    type: String
  },
  type: {
    type: String,
    required: true,
    enum: ['movie', 'tv'],
  },
  watchStatus: {
    type: String,
    enum: ['Not watched', 'Currently watching', 'Watched'],
    default: 'Not watched',
  },
}, { timestamps: true });

export default mongoose.models.Watchlist || mongoose.model<WatchlistItem>('Watchlist', WatchlistSchema);
