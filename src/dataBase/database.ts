import { Sequelize } from 'sequelize'

const myDatabase = new Sequelize('ideaLabDatabase', 'root', '0987654321', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

export default myDatabase
