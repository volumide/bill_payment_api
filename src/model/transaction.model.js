import { Model, DataTypes } from "sequelize"
import sequelize from "../utils/common/connection.js"

class Transaction extends Model {}

Transaction.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    user_id: DataTypes.STRING,
    trans_id: DataTypes.STRING,
    status: { type: DataTypes.STRING, defaultValue: "initialize" },
    reference: { type: DataTypes.STRING, allowNull: true }
  },
  { sequelize, tableName: "transactions", paranoid: true }
)

export default Transaction
