import mongoose from 'mongoose'; // MI-A SCHIMBAT CHATGPTU VARIANTA DIN JS DE PE UN SITE, IN TS SI TREBUIE SA MAI MA UIT SA INTELEG

const MONGODB_URI = process.env.MONGODB_URI;

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
