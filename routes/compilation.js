const express = require('express');
const Sequelize = require('sequelize');
const fileRouter = express.Router();
const connection = require('../mysql')
const mysql_Sequelize = require('../utils/sequelizeConfig')

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

fileRouter.get('/get', (req, res) => {
  const currentPage = Number(req.query.currentPage) || 1
  const pageSize = Number(req.query.pageSize) || 5
  const keywords = req.query.keywords.toString() || ''
  connection.query('SELECT * FROM complation_table WHERE name LIKE ? LIMIT ? OFFSET ?;',
    [`%${keywords}%`, pageSize, (currentPage - 1) * pageSize], (err, result) => {
      if (err) {
        res.json({
          code: 500,
          message: err
        })
      } else {
        const sql = 'SELECT COUNT(*) as total FROM complation_table WHERE name LIKE ?;'
        connection.query(sql, [`%${keywords}%`], (err2, result2) => {
          if (err2) {
            res.json({
              code: 500,
              message: err2
            })
          } else {
            res.json({
              code: 200,
              data: {
                list: result,
                total: result2[0].total
              },
              message: '查询成功'
            })
          }
        })
      }
    })
})

fileRouter.delete('/delete', (req, res) => {
  const id = Number(req.query.id)
  if (!id) {
    res.json({
      code: 500,
      message: 'id不能为空'
    })
    return
  }
  connection.query('DELETE FROM image_table WHERE compilationId = ?', [id], (err, result) => {
    if (err) {
      res.json({
        code: 500,
        message: err
      })
    } else {
      connection.query('DELETE FROM complation_table WHERE id=?', [id], (err2, result2) => {
        if (err2) {
          res.json({
            code: 500,
            message: err2
          })
        } else {
          res.json({
            code: 200,
            message: '删除成功'
          })
        }
      })
    }
  })
})

module.exports = fileRouter