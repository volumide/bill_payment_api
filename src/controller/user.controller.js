import User from "../model/user.model.js"
import { BAD_REQUEST, CREATED, FORBIDDEN, NOT_FOUND, SERVER_ERROR, SUCCESS } from "../utils/common/status-code.js"
import bcrypt from "bcrypt"
import { accessToken } from "../utils/token.js"

const checkUser = async (email) => {
  const user = await User.findOne({
    where: { email: email }
  })
  return user
}

export const signup = async (req, res) => {
  try {
    checkUser = await checkUser(req.body.email)
    if (checkUser) {
      return res.status(FORBIDDEN).json({
        status: FORBIDDEN,
        message: "user already exist "
      })
    }

    await User.create(req.body)
    return res.status(CREATED).json({
      status: CREATED,
      message: "account created"
    })
  } catch (error) {
    console.log(error)
    return res.status(SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: "server error"
    })
  }
}

export const login = async (req, res) => {
  try {
    const user = checkUser(req.body.email)
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
    const token = accessToken(data)
    return res.status(SUCCESS).json({
      status: SUCCESS,
      message: "",
      token: token,
      data: data
    })
  } catch (error) {
    console.log(error)
    return res.status(SERVER_ERROR).json({
      status: SERVER_ERROR,
      message: "server error"
    })
  }
}
