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
  const {bookid, openid} = ctx.request.query
  const mysqlSelect = DB('comments')
    .select('comments.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
  let comments = []
  if (bookid) {
    comments = await mysqlSelect.where('comments.bookid', bookid)
  } else if (openid) {
    comments = await mysqlSelect.where('comments.openid', openid)
  }
  ctx.state.data = {
    comments: comments.map(v => {
      const info = JSON.parse(v.user_info)
      return Object.assign({}, v, {
        user_info: {
          name: info.nickName,
          avatarUrl: info.avatarUrl
        }
      })
    })
  }
}
