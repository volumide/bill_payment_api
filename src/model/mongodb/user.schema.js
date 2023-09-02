import mongoose from "mongoose"

const schema = mongoose.Schema({
  name: String,
  first_name: String,
  password: String,
  last_name: String,
  phone: String,
  email: String,
  deleted_at: Date,
  created_at: Date,
  updated_at: Date
})

const userModel = mongoose.model("users", schema)
export default userModel
