
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  password:String,
  country: String
},
{
  timestamps:true,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;