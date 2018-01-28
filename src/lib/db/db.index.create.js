const
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, indexDoc, callback) => {
    logger.enter('-', __filename);

    logger.data('dbName', dbName);
    logger.data('indexDoc', indexDoc)

    if (dbName && typeof (dbName) === typeof ('') && indexDoc && typeof (indexDoc) === 'object') {
        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }
            db.index(indexDoc, (err) => {
                if (err) {
                    return callback(err);
                }
                return callback(null, true);
            });
        },
            dbName);

    } else {
        return callback(new Error('Invalid input parameters !'), null);
    }

    logger.exit('-', __filename);
}