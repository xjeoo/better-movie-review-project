import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String
  },
  image: {
    type: String
  },
  googleId:{
    type: String
  },
  emailVerified:{
    type: Boolean
  },
  role:{
    type: String,
    default: "user"
  }

});

export default mongoose.models.User || mongoose.model('User', UserSchema);