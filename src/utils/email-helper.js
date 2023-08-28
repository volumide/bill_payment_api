import jwtDecode from "jwt-decode"

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  if (regex.test(email)) return true
  return false
}

export const decodeToken = (req) => {
  const token = req.header.authorization
  if (!token) return false
  const dT = token.split(" ")
  if (dT[0] !== "Bearer".toLocaleLowerCase()) return false
  return jwtDecode(dT[1])
}
