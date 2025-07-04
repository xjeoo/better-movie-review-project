import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  
  username: {
    type: String,
    required: true,
    unique: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type: String
  },
  googleId:{
    type: String
  },
  googleRefreshToken:{
    type: String
  },
  role:{
    type: String,
    default: "user"
  }

});

export default mongoose.models.User || mongoose.model('User', UserSchema);