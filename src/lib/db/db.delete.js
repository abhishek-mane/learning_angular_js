const
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, doc, callback) => {
    logger.enter('-', __filename);
    logger.data('dbName', dbName);

    if (dbName && typeof (dbName) === typeof ('') && doc && typeof (doc) === 'object') {

        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }

            db.destroy(doc._id, doc._rev, (err) => {
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