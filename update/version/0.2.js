const sequelize = require('../../db/mysqldb/init')
const models = require('../../db/mysqldb/define')(sequelize)
const { lowdb } = require('../../db/lowdb/index')
const CURRENT_VERSION = 0.2
class update0_2 {
  static update () {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`正在升级中，当前版本是${CURRENT_VERSION}....`)

        await models.sequelize.query(
          'rename TABLE user_like_article to article_like;'
        )

        await models.sequelize.query(
          'rename TABLE subscribe_article_tag to rss_article_tag;'
        )

        await models.sequelize.query(
          'rename TABLE admin_system_log to system_log;'
        )

        await models.sequelize.query(
          'rename TABLE user_article_topic to article_blog;'
        )

        await models.sequelize.query('rename TABLE comment to article_comment;')

        // await models.sequelize.query(
        //   'rename TABLE article_like to user_like_article;'
        // )

        // await models.sequelize.query(
        //   'rename TABLE rss_article_tag  to subscribe_article_tag;'
        // )

        // await models.sequelize.query(
        //   'rename TABLE system_log  to admin_system_log;'
        // )

        // await models.sequelize.query(
        //   'rename TABLE article_blog  to user_article_topic;'
        // )

        // await models.sequelize.query('rename TABLE article_comment to comment;')

        // ALTER TABLE 表名 CHANGE 旧字段名 新字段名 新数据类型;
        await models.sequelize.query(
          'ALTER TABLE article_blog CHANGE topic_id blog_id bigint(20) auto_increment comment "字段的注释";'
        )
        await models.sequelize.query(
          'ALTER TABLE article_blog CHANGE topic_name name VARCHAR(20);'
        )
        await models.sequelize.query(
          'ALTER TABLE article_blog CHANGE topic_description description VARCHAR(100);'
        )
        await models.sequelize.query(
          'ALTER TABLE article_blog CHANGE topic_subscribe subscribe int(10);'
        )
        await models.sequelize.query(
          'ALTER TABLE article_blog CHANGE topic_icon icon VARCHAR(200);'
        )

        await models.sequelize.query(
          'ALTER TABLE article CHANGE user_topic_ids user_blog_ids VARCHAR(200);'
        )

        console.log(`${CURRENT_VERSION}版本升级完成`)
        await lowdb
          .get('config')
          .assign({ version: CURRENT_VERSION })
          .write()
        resolve(`${CURRENT_VERSION}版本升级完成`)
      } catch (err) {
        reject(err)
      }
    })
  }
}

module.exports = update0_2
