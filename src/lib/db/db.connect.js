const
    logger = require(global.webconfig.logging.logger),
    getDbConf = function (VCAP_SERVICES) {
        logger.enter('getDbConf', __filename);
        logger.data('VCAP_SERVICES', VCAP_SERVICES);

        if (VCAP_SERVICES) {
            let vcapServices = JSON.parse(VCAP_SERVICES);
            for (let vcapService in vcapServices) {
                if (vcapService.match(/cloudant/i)) {
                    logger.exit('getDbConf', __filename);
                    return {
                        url: vcapServices[vcapService][0].credentials.url
                    }
                }
            }
        }

        logger.exit('getDbConf', __filename);
        return {
            url: global.webconfig.db.url
        }
    };

module.exports = (callback, dbName) => {
    require('cloudant')(getDbConf(process.env.VCAP_SERVICES), (err, cloudant) => {
        if (err) {
            return callback(err, null);
        }
        if (dbName && typeof (dbName) === typeof ('')) {
            let dbConn = cloudant.db.use(dbName);
            dbConn.info((err) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, dbConn);
            })
        } else {
            return callback(null, cloudant);
        }
    });
}