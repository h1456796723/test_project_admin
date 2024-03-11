const express = require('express');
const fileRouter = express.Router();
const connection = require('../mysql')

fileRouter.post('/add', (req, res) => {
  const { name, sort, image } = req.body
  if (name && sort && image) {
    connection.query('INSERT INTO complation_table(name, sort, image) VALUES(?, ?, ?);',
      [name, sort, image], (err, result) => {
        if (err) {
          console.log('/add', err)
          res.json({
            code: 500,
            message: '服务器错误'
          })
        } else {
          res.json({
            code: 200,
            message: '添加成功'
          })
        }
      })
  } else {
    res.json({
      code: 500,
      message: '参数不完整'
    })
  }
})

module.exports = fileRouter