import mongoose from 'mongoose';

const RatingSchema = new mongoose.Schema({
  
  contentId: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required: true,
    enum: ["movie", "tv"]
  },
  numberOfReviews:{
    type: Number,
    required:true,
  },
  averageRating:{
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

export default mongoose.models.Rating || mongoose.model('Rating', RatingSchema);