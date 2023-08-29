import axios from "axios"
import { BAD_REQUEST, FORBIDDEN, SUCCESS } from "../utils/common/status-code.js"
import Transaction from "../model/transaction.model.js"

/**
 *  the supplied api endpoint does not retrun any response all response starting from registeration all return status cod 403
 * I improvised with a network i had a demo account with
 *
 */

// const baseUrl = "https://walletdemo.remita.net/api/"

// this is the improvised api end point for merchant verifification and electricity payment
const baseUrl = "https://sandbox.vtpass.com/api/"
const auth = {
  username: "volumide42@gmail.com",
  password: "Olumide1"
}

export const verifyMerchernt = async (req, res) => {
  // const { meterNo, accountType, service, amount, user_id } = req.body
  const { serviceID, billersCode, type } = req.body
  const dtObj = {
    billersCode: billersCode,
    serviceID: serviceID,
    type: type
  }

  try {
    const result = await axios.post(baseUrl + "merchant-verify", dtObj, { auth: auth })
    return res.status(SUCCESS).json({
      status: SUCCESS,
      data: result.data,
      message: ""
    })
  } catch (error) {
    console.log(error)
    return res.status(FORBIDDEN).json({
      status: FORBIDDEN,
      message: error
    })
  }
}

export const purcahseElectricity = async (req, res) => {
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
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hour = String(now.getHours()).padStart(2, "0")
  const minute = String(now.getMinutes()).padStart(2, "0")
  const randomNumber = Math.floor(Math.random() * 10000)
  const rnd = randomNumber.toString().padStart(4, "0")
  const request_id = `${year}${month}${day}${hour}${minute}WNK${rnd}`

  const { serviceID, billersCode, type, variation_code, amount, phone } = req.body

  const dtObj = {
    serviceID,
    billersCode,
    type,
    variation_code,
    amount,
    phone,
    request_id
  }

  try {
    // const result = await axios.post(baseUrl + "itex/purchase/electricity", dtObj)
    const result = await axios.post(baseUrl + "pay", dtObj, { auth: auth })
    if (result.data.code === "000") {
      await Transaction.create({
        user_id: req.body.user_id,
        reference: request_id,
        status: "success"
      })
      return res.status(SUCCESS).json({
        status: SUCCESS,
        message: "success",
        data: result.data
      })
    }

    await Transaction.create({
      user_id: req.body.user_id,
      reference: request_id,
      status: "fail"
    })

    return res.status(BAD_REQUEST).json({
      status: BAD_REQUEST,
      data: result.data,
      message: "transaction fail"
    })
  } catch (error) {
    console.log(error)
    return res.status(FORBIDDEN).json({
      status: FORBIDDEN,
      message: ""
    })
  }
}
