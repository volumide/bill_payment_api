import { purcahseElectricity, services, verifyMerchernt } from "../controller/bill.controller.js"
import { middleware } from "../utils/token.js"

const route = (app) => {
  // app.post("/verify-meter", middleware, verifyMerchernt)
  app.post("/electricity/payment", middleware, purcahseElectricity)
  app.get("/services", services)
}

export default route
