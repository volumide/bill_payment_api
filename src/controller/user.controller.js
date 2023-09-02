import User from "../model/user.model.js"
import { BAD_REQUEST, CONFLICT, CREATED, FORBIDDEN, NOT_FOUND, SERVER_ERROR, SUCCESS } from "../utils/common/status-code.js"
import bcrypt from "bcrypt"
import { accessToken } from "../utils/token.js"
import { validateEmail } from "../utils/email-helper.js"

/**
 * this is a resuable function to check if user exist in db
 */
const checkUser = async (email) => {
  try {
    const user = await User.findOne({
      where: { email: email }
    })
    return user
  } catch (error) {
    console.log(error)
  }
}

/**
 *
 * @param {first_name, last_name, email, phone, password} req
 * @param {object} res
 * @returns
 */
export const signup = async (req, res) => {
  try {
    // sanitize email
    const checkMail = validateEmail(req.body.email)
    if (!checkMail)
      return res.status(CONFLICT).json({
        status: FORBIDDEN,
        message: "invalid mail format"
      })

    // check if user already exist with the mail
    const checkUser = await User.findOne({
      where: { email: req.body.email }
    })

    if (checkUser) {
      return res.status(CONFLICT).json({
        status: CONFLICT,
        message: "user already exist "
      })
    }
    console.log(req.body)
    const result = await User.create(req.body)
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

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const login = async (req, res) => {
  try {
    const user = await checkUser(req.body.email)
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
    const {
      dataValues: { password, ...data }
    } = user
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
