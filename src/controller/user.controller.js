import User from "../model/user.model.js"
import { BAD_REQUEST, CREATED, NOT_FOUND, SERVER_ERROR, SUCCESS } from "../utils/common/status-code.js"
import bcrypt from "bcrypt"

export const signup = async (req, res) => {
  try {
    await User.create(req.body)
    return res.status(CREATED).json({
      status: CREATED,
      message: "account created"
    })
  } catch (error) {
    console.log(error)
    return res.status(SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: "signup fail"
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (!user) {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: "user not found"
      })
    }
    const passwordCheck = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCheck) {
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: "invalid password"
      })
    }
    const { password, ...data } = user

    return res.status(SUCCESS).json({
      status: SUCCESS,
      message: "",
      //   token:
      data: data
    })
  } catch (error) {
    console.log(error)
    return res.status(SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: "signup fail"
    })
  }
}
