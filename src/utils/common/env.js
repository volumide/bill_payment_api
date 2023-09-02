import dotenv from "dotenv"
dotenv.config()

/**
 * db configuration
 */
export const HOST = process.env.HOST
export const USERNAME = process.env.USERNAME
export const PASSWORD = process.env.PASSWORD
export const DBTABLE = process.env.DBTABLE
export const PORT = process.env.PORT

// mongo db connection
export const CONNECTION_STRING = process.env.CONN_STRING
