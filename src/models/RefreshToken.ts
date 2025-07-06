import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const RefreshTokenSchema = new mongoose.Schema({
  
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt:{
    type: Date,
    required: true,
    unique: true
  },

});

export default mongoose.models.User || mongoose.model('User', RefreshTokenSchema);