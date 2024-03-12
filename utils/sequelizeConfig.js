const Sequelize = require('sequelize')

const mysql_Sequelize = new Sequelize('test_compliation', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 3,
    idle: 20000
  },
  define: {
    'charset': 'utf8',
  }
})

mysql_Sequelize.authenticate()
  .then(() => {
    console.log('数据库连接成功 --- sequelize')
  })
  .catch(err => {
    console.log('数据库连接失败', err)
  })

module.exports = mysql_Sequelize