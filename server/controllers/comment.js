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
  const {openid, bookid, comment, phone, location} = ctx.request.body
  try {
    await DB('comments').insert({openid, bookid, comment, phone, location})
    ctx.state.data = {
      msg: 'success'
    }
  } catch (e) {
    ctx.state = {
      code: -1,
      data: {
        msg: '评论失败' + e.sqlMessage
      }
    }
  }
}
