const Remote = require('./remote');
const config = require('../../../config');

module.exports = new Remote(config.mysqlService.host, config.mysqlService.port);