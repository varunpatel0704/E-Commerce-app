import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
});

const user = mongoose.model('user', userSchema);

const user1 = new user({name: 'varun'});
console.log(user1);