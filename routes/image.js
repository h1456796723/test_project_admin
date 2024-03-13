const express = require('express')
const imageRouter = express.Router();
const connection = require('../mysql')

imageRouter.post('/add', (req, res) => {
  const { compilationId, name, image } = req.body
  if (compilationId && name && image) {
    const sql = 'INSERT INTO image_table (compilationId, name, image) VALUES (?, ?, ?)'
    connection.query(sql, [compilationId, name, image], (err, result) => {
      if (err) {
        res.json({
          code: 500,
          message: err
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
      message: '参数错误'
    })
  }
})

imageRouter.get('/get', (req, res) => {
  const pageSize = Number(req.query.pageSize) || 10
  const currentPage = Number(req.query.currentPage) || 1
  const keywords = req.query.keywords || ''
  const compilationId = req.query.compilationId
  if (!compilationId) {
    res.json({
      code: 500,
      message: 'compilationId不能为空'
    })
    return
  }
  const sql = `SELECT * FROM image_table WHERE name LIKE ? AND compilationId = ? LIMIT ? OFFSET ?`
  connection.query(sql, [`%${keywords}%`, compilationId, pageSize, (currentPage - 1) * pageSize],
    (err, result) => {
      if (err) {
        res.json({
          code: 500,
          message: err
        })
      } else {
        connection.query(`SELECT COUNT(*) as total FROM image_table WHERE name LIKE ? AND compilationId = ?`,
          [`%${keywords}%`, compilationId],
          (err2, result2) => {
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

imageRouter.delete('/delete', (req, res) => {
  const id = req.query.id
  if (!id) {
    res.json({
      code: 500,
      message: 'id不能为空'
    })
    return
  }
  connection.query('DELETE FROM image_table WHERE id = ?',
    [id], (err, result) => {
      if (err) {
        res.json({
          code: 500,
          message: err
        })
      } else {
        res.json({
          code: 200,
          message: '删除成功'
        })
      }
    })
})

module.exports = imageRouter