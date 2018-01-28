let logger = require(global.webconfig.logging.logger);

module.exports = (dbName, query, callback) => {
    logger.enter('-', __filename);
    logger.data('dbName', dbName);
    logger.data('query', query);

    if (dbName && query && typeof (dbName) === typeof ('') && typeof (query) === 'object') {
        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }
            db.find(query, (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, result);
            });
        },
            dbName);
    } else {
        return callback(new Error('Input parameters not valid !'), null);
    }

    logger.exit('-', __filename);
}