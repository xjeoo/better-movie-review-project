import mongoose from 'mongoose';

const WatchlistSchema = new mongoose.Schema({
  
  contentId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
    enum:['movie','tv']
  }

},{timestamps: true});

export default mongoose.models.Watchlist || mongoose.model('Watchlist', WatchlistSchema);