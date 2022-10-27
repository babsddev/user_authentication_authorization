import { Sequelize } from 'sequelize'

const myDatabase = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.DATABASE_USER}`,
  `${process.env.DATABASE_PASSWORD}`,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
)

export default myDatabase
