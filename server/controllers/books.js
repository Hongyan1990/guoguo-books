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

// https://api.douban.com/v2/book/isbn/9787115275790?apikey=0df993c66c0c636e29ecbb5344252a4a
module.exports = async (ctx) => {
    const {isbn, openId} = ctx.request.body
    if (isbn && openId) {
        const searchBook = await DB('book').select().where('isbn', isbn)
        if (searchBook.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        const url = `https://api.douban.com/v2/book/isbn/${isbn}?apikey=0df993c66c0c636e29ecbb5344252a4a`
        const res = await axios.get(url)
        const bookInfo = res.data
        console.log(bookInfo)
        const rate = bookInfo.rating.average
        const { title, image, alt, publisher, summary, price } = bookInfo
        const tags = bookInfo.tags.map(v => {
            return `${v.title} ${v.count}`
        }).join('.')
        const author = bookInfo.author.join(',')

        try {
            console.log('开始存储')
            await DB('book').insert({isbn, openId, title, image, alt, publisher, summary, price, tags, author, rate})
            console.log('存储完成')
            ctx.state.data = {
                title,
                msg: 'success'
            }
        } catch (e) {
            console.log(e)
            ctx.state = {
                code: -1,
                data: {
                    msg: '新增失败：' + e.sqlMessage
                }
            }
        }
    }
}
