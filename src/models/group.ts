import { DataTypes, Model } from "sequelize";
import myDatabase from "../dataBase/database";

interface DroupAttributes {
  id: string;
  account?: string;
  engineering?: string;
  humanResource?: string;
  userID: string;
}

// export class GroupInstance extends Model<DroupAttributes> {}

export const GroupInstance = myDatabase.define("UserGroup", {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
    defaultValue: "none",
  },
  engineering: {
    type: DataTypes.STRING,
    defaultValue: "none",
  },
  humanResource: {
    type: DataTypes.STRING,
    defaultValue: "none",
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
