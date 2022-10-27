import { DataTypes, Model } from 'sequelize'
import myDatabase from '../dataBase/database'
import { GroupInstance } from './group'
import { RoleInstance } from './role'

interface UserAttributes {
  id: string
  firstName: string
  lastName: string
  username: string
  email: string
  password: string
  phoneNumber: string
  avatar: string
  isVerified?: boolean
}

// export class UserInstance extends Model<UserAttributes> {}

export const UserInstance = myDatabase.define('User', {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'First name is required',
      },
      notEmpty: {
        msg: 'First name cannot be empty',
      },
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Last name is required',
      },
      notEmpty: {
        msg: 'Last name cannot be empty',
      },
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Username is required',
      },
      notEmpty: {
        msg: 'Username cannot be empty',
      },
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Email is required',
      },
      notEmpty: {
        msg: 'Email cannot be empty',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Password is required',
      },
      notEmpty: {
        msg: 'Password cannot be empty',
      },
    },
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Phone number is required',
      },
      notEmpty: {
        msg: 'Phone number cannot be empty',
      },
    },
  },
  avatar: {
    type: DataTypes.STRING,
    defaultValue:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU',
  },
  isVerified: {
    type: DataTypes.STRING,
    defaultValue: false,
  },
})

UserInstance.hasMany(RoleInstance, { foreignKey: 'userID', as: 'Role' })

UserInstance.hasMany(GroupInstance, { foreignKey: 'userID', as: 'Group' })

RoleInstance.belongsTo(UserInstance, { foreignKey: 'userID', as: 'User' })

GroupInstance.belongsTo(UserInstance, {
  foreignKey: 'userID',
  as: 'User',
})
