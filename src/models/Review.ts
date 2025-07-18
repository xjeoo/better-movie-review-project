import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema({
  
  movieId: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  rating:{
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  text:{
    type: String,
    required: true,
    minLength: [10, "Review can't be shorter than 10 characters"],
    maxLength: [1200, "Review can't exceed 1200 characters"],
  }

});

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);