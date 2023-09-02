import { Model, DataTypes } from "sequelize"
import sequelize from "../utils/common/connection.js"
import bcrypt from "bcrypt"

const salt = 12
class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    password: {
      type: DataTypes.STRING
    }
  },
  { sequelize, tableName: "users", paranoid: true }
)

User.beforeCreate(async (user, options) => {
  const hashPassword = await bcrypt.hash(user.password.toString(), salt)
  user.password = hashPassword
})
export default User
