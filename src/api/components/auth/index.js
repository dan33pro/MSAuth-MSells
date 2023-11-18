const ctrl = require('./controller');
const store = require('../../../tools/store/remote-mysql');

module.exports = ctrl(store);