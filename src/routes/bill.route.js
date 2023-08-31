import { purcahseElectricity, services, verifyMerchernt } from "../controller/bill.controller.js"
import { middleware } from "../utils/token.js"

const route = (app) => {
  app.post("/verify-meter", middleware, verifyMerchernt)
  app.post("/electricity/payment", middleware, purcahseElectricity)
  app.get("/services", services)
}

export default route

// const dtObj = {
//   "customerPhoneNumber": req.body.phone,
//   "paymentMethod": "cash",
//   "service": req.body.service,
//   "clientReference": "asd4978716271752715157570",
//   "productCode": req.body.code,
//   "card": {},
//   "amount": req.body.amount,
//   "sourceAccountNumber": req.body.acctNumber,
//   "transactionPin": req.body.tranPin,
//   "narration": "electricity",
//   "redeemBonus": false,
//   "bonusAmount": 0
// }
