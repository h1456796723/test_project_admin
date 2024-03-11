const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const router = express.Router();
const cors = require('cors')
const fileRouter = require('./routes/compilation.js')

const connection = require('./mysql.js')

app.use(express.json()) // 接收前端json格式文件
app.use(cors()) // cors中间件处理跨域
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));
app.use(router.use('/compilation', fileRouter))

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to MySQL', err);
  } else {
    console.log('Connected to MySQL');
  }
})

app.listen(80, () => {
  console.log('服务器已启动,80端口监听中...')
})