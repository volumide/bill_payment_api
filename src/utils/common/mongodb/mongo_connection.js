import mongoose from "mongoose"
import { CONNECTION_STRING } from "../env"
const connection = async () => {
  try {
    const connString = CONNECTION_STRING
    await mongoose.connect(connString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log("connection successful")
  } catch (error) {
    console.log(error)
  }
}

export default connection
