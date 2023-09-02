import mongoose from "mongoose"

const schema = mongoose.Schema({
  user_id: String,
  trans_id: String,
  status: String,
  reference: String,
  created_at: String
})

const TransactionModel = mongoose.model("transactions", schema)
export default TransactionModel
