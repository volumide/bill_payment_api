import userModel from "../../model/mongodb/user.schema"
import { BAD_REQUEST, CONFLICT, FORBIDDEN, NOT_FOUND, SUCCESS } from "../../utils/common/status-code"
import { validateEmail } from "../../utils/email-helper"
import bcrypt from "bcrypt"
import { accessToken } from "../../utils/token"

export const signUp = async (req, res) => {
  try {
    req.body["created_at"] = new Date()

    const checkEmail = validateEmail(req.body["email"])
    if (!checkEmail) {
      return res.status(FORBIDDEN).json({ status: FORBIDDEN, message: "invalid mail format" })
    }

    const checkUserExist = await userModel.findOne({ email: req.body["email"] })
    if (checkUserExist) {
      return res.status(CONFLICT).json({
        status: CONFLICT,
        message: "user already exist "
      })
    }

    const hashPassword = await bcrypt.hash(req.body.password.toString(), 12)
    const password = hashPassword

    const { first_name, last_name, phone, email, created_at } = req.body
    await userModel.create({
      first_name,
      last_name,
      phone,
      email,
      password,
      created_at
    })
    return res.status(CREATED).json({
      status: CREATED,
      message: "account created"
    })
  } catch (error) {
    console.log(error)
  }
}

export const login = async (req, res) => {
  try {
    const checkUserExist = await userModel.findOne({ email: req.body["email"] })
    if (!checkUserExist) {
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: "user not found"
      })
    }

    const checkPassword = await bcrypt.compare(req.body.password, checkUserExist["password"])
    if (!checkPassword) {
      return res.status(BAD_REQUEST).json({
        status: BAD_REQUEST,
        message: "invalid password"
      })
    }
    const { password, ...data } = checkUserExist
    const token = accessToken(data)
    return res.status(SUCCESS).json({
      status: SUCCESS,
      token: token,
      data: data,
      message: ""
    })
  } catch (err) {
    //
  }
}
