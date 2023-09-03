import mongoose from "mongoose"
import { CONNECTION_STRING } from "../env.js"
const connection = async () => {
  try {
    const connString = CONNECTION_STRING
    const connect = await mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("mongo connection success")
  } catch (error) {
    console.log(error)
  }
}

export default connection
