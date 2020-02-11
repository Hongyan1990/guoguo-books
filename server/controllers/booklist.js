const axios = require('axios')
const {mysql: config} = require('../config')

const DB = require('knex')({
  client: 'mysql',
  connection: {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.pass,
    database: config.db,
    charset: config.char,
    multipleStatements: true
  }
})

module.exports = async (ctx) => {
  const {page, openid} = ctx.request.query
  const size = 10
  const mysqlSelect = DB('book')
    .select('book.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'book.openId', 'cSessionInfo.open_id')
    .orderBy('book.id', 'desc')
  let books
  if (openid) {
    books = await mysqlSelect.where('book.openId', openid)
  } else {
    books = await mysqlSelect.limit(size).offset(Number(page) * size)
  }
  ctx.state.data = {
    books: books.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          nickName: info.nickName
        }
      })
    })
  }
}
