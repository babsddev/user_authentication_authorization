import { DataTypes, Model } from 'sequelize'
import myDatabase from '../dataBase/database'

interface DroupAttributes {
  id: string
  account?: string
  engineering?: string
  humanResource?: string
  userID: string
}

// export class GroupInstance extends Model<DroupAttributes> {}

export const GroupInstance = myDatabase.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  account: {
    type: DataTypes.STRING,
  },
  engineering: {
    type: DataTypes.STRING,
  },
  humanResource: {
    type: DataTypes.STRING,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})
