import { Model, DataTypes } from "sequelize"
import sequelize from "../utils/common/connection.js"
import bcrypt from "bcrypt"

const salt = 12
class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      set(val) {
        this.setDataValue(
          "password",
          bcrypt
            .hash(val.toString(), salt)
            .then(() => console.log(""))
            .catch((err) => console.log(err))
        )
      }
    }
  },
  { sequelize, tableName: "users", paranoid: true }
)

export default User
