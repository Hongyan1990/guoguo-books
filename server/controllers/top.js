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
  const books = await DB('book')
    .select('id', 'title', 'image', 'count')
    .orderBy('count', 'desc')
    .limit(9)
  ctx.state.data = {
    list: books
  }
}
