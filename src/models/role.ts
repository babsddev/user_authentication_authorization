import { DataTypes, Model } from "sequelize";
import myDatabase from "../dataBase/database";

interface RoleAttributes {
  id: string;
  junior?: string;
  midLevel?: string;
  senior?: string;
  userID: string;
}

// export class RoleInstance extends Model<RoleAttributes> {}

export const RoleInstance = myDatabase.define("UserRole", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  junior: {
    type: DataTypes.STRING,
  },
  midLevel: {
    type: DataTypes.STRING,
  },
  senior: {
    type: DataTypes.STRING,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
