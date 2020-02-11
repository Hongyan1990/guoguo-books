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
  const { id } = ctx.request.query
  const book = await DB('book')
    .select('book.*', 'cSessionInfo.user_info')
    .join('cSessionInfo', 'book.openId', 'cSessionInfo.open_id')
    .where('id', id)
    .first()
  const info = JSON.parse(book.user_info)
  ctx.state.data = Object.assign({}, book, {
    tags: book.tags.split('.'),
    summary: book.summary.split('\n'),
    user_info: {
      name: info.nickName,
      image: info.avatarUrl
    }
  })
  await DB('book')
    .where('id', id)
    .increment('count', 1)
}
