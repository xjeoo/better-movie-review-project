import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  
  movieId: {
    type: String,
    required: true,
  },
  numberOfReviews:{
    type: Number,
    required:true,
  },
  averageRating:{
    type: Number,
    required: true,
  }
});

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);