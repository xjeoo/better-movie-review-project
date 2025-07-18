import { GoogleUserInfo } from '@/types/auth';
import User from '@/models/User';
import mongoose from 'mongoose'; 
import { redirect } from 'next/navigation';
import Review from '@/models/Review';
const MONGODB_URI = process.env.MONGODB_URI;

// DATABASE INITIATION START HERE // SCRISA CU CHATGPT

if (!MONGODB_URI) { 
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Definim un tip pentru cache, ca să știe TypeScript ce proprietăți are
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extindem tipul global corect, fără @ts-ignore și fără dublări
declare global {
  // Folosim 'var' ca să definim proprietăți globale
  var mongoose: MongooseCache | undefined;
}

// Inițializăm cache-ul global, dacă nu există deja
if (!global.mongoose) {
  global.mongoose = { conn: null, promise: null };
}
const cached = global.mongoose;

async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

// DATABASE INITIATION ENDS HERE

export async function saveUserToDatabase(user: GoogleUserInfo) {
  const { email, name, googleId, image, emailVerified } = user;

  await dbConnect();

  // 1. Caută user cu googleId
  const userWithGoogleId = await User.findOne({ googleId });

  if (userWithGoogleId ) {
      
    // User deja există cu acest googleId, nu mai facem nimic
    return true;
  }

  // 2. Dacă nu există googleId, caută user cu același email
  const userWithEmail = await User.findOne({ email });

  if (userWithEmail) {
    if(userWithEmail.emailVerified === false && userWithEmail.googleId === undefined)
      return redirect('/error');
    // Dacă există user cu email, dar fără googleId, îi adăugăm googleId
    userWithEmail.googleId = googleId;
    if(userWithEmail.image === "none")
      userWithEmail.image = image
    await userWithEmail.save();
    return true;
  }

  // 3. Dacă nu există deloc user, creăm unul nou
  const newUser = new User({
    email,
    username: name,
    googleId,
    image,
    emailVerified,
    role: "user",
  });

  await newUser.save();
  return true;
}

type saveReviewResponse={
  ok: boolean,
  text: string;
}
export async function saveReviewToDatabase(movieId: string, userId: mongoose.Types.ObjectId, rating: number, text: string):Promise<saveReviewResponse>{
  await dbConnect();
  const reviewExists = await Review.findOne({userId, movieId});

  if(reviewExists) return {
    ok: false,
    text: "Movie already reviewed"
  }

  const newReview = new Review({
    movieId,
    userId,
    rating,
    text
  });

  await newReview.save();

  return  {
    ok: true,
    text: "Review saved"
  }

}
