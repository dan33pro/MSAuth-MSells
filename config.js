require('dotenv').config();

module.exports = {
    myAuthService: {
        port: process.env.MYAUTH_SERVICE_PORT || 3000,
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || '',
        port: process.env.MYSQL_SERVICE_PORT || '',
    },
    jwt: {
        secret: process.env.JWT_SECRET || '',
    },
};