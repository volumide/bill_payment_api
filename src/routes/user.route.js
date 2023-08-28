import { login, signup } from "../controller/user.controller.js"

const route = (app) => {
  app.post("/signup", middleware, signup)
  app.post("/login", middleware, login)
}

export default route
