/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

var redisCloudUrl = process.env.REDISCLOUD_URL;
var redisCloudUrlParsed = 'http://localhost:6379';
if(redisCloudUrl){
  redisCloudUrlParsed = require("url").parse(redisCloudUrl);
}
module.exports.connections = {  

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  someMysqlServer: {
    adapter: 'sails-mysql',
    host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
    user: 'YOUR_MYSQL_USER',
    password: 'YOUR_MYSQL_PASSWORD',
    database: 'YOUR_MYSQL_DB'
  },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  herokuMongodb: {
    adapter: 'sails-mongo',
    url: process.env.MONGOHQ_URL
  },

  /***************************************************************************
  *                                                                          *
  * A Sails/Waterline adapter for Redis.                                     *
  * http://en.wikipedia.org/wiki/Redis                                       *
  *                                                                          *
  * Run: npm install sails-redis                                             *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
/*  herokuRedisServer: {
    port: redisCloudUrlParsed.port,
    host: redisCloudUrlParsed.host.split(":")[0],
    password: redisCloudUrlParsed.auth.split(":")[1],
    database: redisCloudUrlParsed.auth.split(":")[0],
    options: {

      // low-level configuration
      // (redis driver options)
      parser: 'hiredis',
      return_buffers: false,
      detect_buffers: false,
      socket_nodelay: true,
      no_ready_check: false,
      enable_offline_queue: true
    }
  },*/

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  herokuPostgres: {
    adapter: 'sails-postgresql',
    url: process.env.DATABASE_URL,
    ssl: true,
    schema: true
  },


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

  // In-memory adapter for DEVELOPMENT ONLY
  // (data is NOT preserved when the server shuts down)
  memory: {
    module: 'sails-dirty',
    inMemory: true
  },

  // Persistent adapter for DEVELOPMENT ONLY
  // (data IS preserved when the server shuts down)
  // PLEASE NOTE: disk adapter not compatible with node v0.10.0 currently 
  //        because of limitations in node-dirty
  //        See https://github.com/felixge/node-dirty/issues/34
  disk: {
    module: 'sails-dirty',
    filePath: './.tmp/dirty.db',
    inMemory: false
  },

};
