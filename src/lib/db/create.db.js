const logger = require(global.webconfig.logging.logger);

module.exports = (dbName, callback) => {
    logger.enter('-', __filename);
    logger.data('dbName', dbName);

    if (dbName && typeof (dbName) === typeof ('')) {
        let dbConnect = require('./db.connect');
        dbConnect((err, cloudant) => {
            if (err) {
                return callback(err, null);
            }
            cloudant.db.create(dbName, (err) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, true);
            });
        });
    } else {
        return callback(new Error('Invalid input parameters !'), null);
    }

    logger.exit('-', __filename);
}