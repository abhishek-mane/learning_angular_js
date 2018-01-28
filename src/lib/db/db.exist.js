const
    DATABASE_NOT_EXIST_MSG = 'Database does not exist.',
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, callback) => {
    logger.enter('-', __filename);
    logger.data('dbName', dbName);

    if (dbName && typeof (dbName) === typeof ('')) {
        let dbConnect = require('./db.connect');
        dbConnect((err, cloudant) => {
            if (!err) {
                return callback(null, true);
            } else if (err.message === DATABASE_NOT_EXIST_MSG) {
                return callback(null, false);
            }
            return callback(err, null);
        }, dbName);
    } else {
        return callback(new Error('Invalid input parameters !'), null);
    }

    logger.exit('-', __filename);
}