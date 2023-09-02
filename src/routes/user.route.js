import { mongoLogin, signUp } from "../controller/mongodb/user.mongo.controller.js"
// import { login, signup } from "../controller/user.controller.js"

const route = (app) => {
  app.post("/signup", signUp)
  app.post("/login", mongoLogin)
}

export default route
