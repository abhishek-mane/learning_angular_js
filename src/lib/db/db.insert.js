const
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, doc, callback) => {
    logger.enter('-', __filename);

    logger.data('dbName', dbName);
    logger.data('doc', doc)

    if (dbName && typeof (dbName) === typeof ('') && typeof (doc) === 'object') {
        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }
            db.insert(doc, (err) => {
                if (err) {
                    return callback(err, null);
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