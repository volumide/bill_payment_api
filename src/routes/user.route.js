import { login, signup } from "../controller/user.controller.js"

const route = (app) => {
  app.post("/signup", signup)
  app.post("/login", login)
}

export default route
