import axios from "axios"
import { FORBIDDEN, SUCCESS } from "../utils/common/status-code"

const baseUrl = "https://walletdemo.remita.net/api/"

export const verifyMerchernt = async (req, res) => {
  const { meterNo, accountType, service, amount, user_id } = req.body
  const dtObj = {
    meterNo,
    accountType,
    service,
    amount,
    "channel": "MOBILE"
  }

  try {
    const result = await axios.post(baseUrl + "itex/validate/meter", dtObj)
    return res.status(SUCCESS).json({
      status: SUCCESS,
      data: result,
      message: ""
    })
  } catch (error) {
    console.log(error)
    return res.status(FORBIDDEN).json({
      status: FORBIDDEN,
      message: ""
    })
  }
}

export const purcahseElectricity = async () => {
  const dtObj = {
    "customerPhoneNumber": req.body.phone,
    "paymentMethod": "cash",
    "service": req.body.service,
    "clientReference": "asd4978716271752715157570",
    "productCode": req.body.code,
    "card": {},
    "amount": req.body.amount,
    "sourceAccountNumber": req.body.acctNumber,
    "transactionPin": req.body.tranPin,
    "narration": "electricity",
    "redeemBonus": false,
    "bonusAmount": 0
  }

  try {
    const result = await axios.post(baseUrl + "itex/purchase/electricity", dtObj)
    return res.status(SUCCESS).json({
      status: SUCCESS,
      data: result,
      message: ""
    })
  } catch (error) {
    console.log(error)
    return res.status(FORBIDDEN).json({
      status: FORBIDDEN,
      message: ""
    })
  }
}
