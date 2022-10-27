import { Sequelize } from 'sequelize'

const myDatabase = new Sequelize('ideaLabDatabase', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
})

export default myDatabase
