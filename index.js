import express, { json } from "express"
import cors from "cors"
import { PORT } from "./src/utils/common/env.js"

/**
 * import routes
 */
import userRoute from "./src/routes/user.route.js"
import billRoute from "./src/routes/bill.route.js"
import sequelize from "./src/utils/common/connection.js"

const router = express.Router()
const app = express()
app.use(cors({ origin: "*" }))
app.use(json())

/**
 * register routes
 */
userRoute(router)
billRoute(router)
app.use("/api/", router)

/**
 * sync databse
 */
sequelize.sync()
app.listen(PORT, () => console.log(`app running on port ${PORT}`))
