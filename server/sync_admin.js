import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/redash';

async function sync() {
  await mongoose.connect(MONGO_URI);
  const adminSchema = new mongoose.Schema({
    email: String,
    password: String,
    updatedAt: Date
  }, { collection: 'admins' });
  
  const Admin = mongoose.model('AdminSync', adminSchema);
  const result = await Admin.updateMany({}, { email: 'admin@redash.in' });
  console.log('Update result:', result);
  
  const currentAdmins = await Admin.find({});
  console.log('Admins now in DB:');
  currentAdmins.forEach(a => console.log(' ->', a.email));
  await mongoose.disconnect();
}

sync().catch(console.error);
