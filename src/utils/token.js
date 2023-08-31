import jwt from "jsonwebtoken"
import { FORBIDDEN } from "./common/status-code.js"
import jwtDecode from "jwt-decode"

export const accessToken = (user) => jwt.sign(user, "token")

export const middleware = (req, res, next) => {
  const auth = req.headers["authorization"]
  const token = auth ? auth.split(" ")[1] : ""
  if (!token)
    return res.status(401).json({
      "message": "unauthorized"
    })
  jwt.verify(token, "token", (err, user) => {
    if (err) {
      return res.status(FORBIDDEN).json({
        "message": err.message
      })
    } else {
      req.user = user
      next()
    }
  })
}

export const decode = (req) => {
  const auth = req.headers["authorization"]
  const token = auth.split(" ")[1]
  return jwtDecode(token)
}
