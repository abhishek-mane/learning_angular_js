const
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, designDocName, viewName, query, callback) => {
    logger.enter('-', __filename);

    logger.data('dbName', dbName);
    logger.data('designDocName', designDocName);
    logger.data('viewName', viewName);

    if (
        dbName && designDocName && viewName &&
        typeof (dbName) === typeof ('') &&
        typeof (designDocName) === typeof ('') &&
        typeof (viewName) === typeof ('')
    ) {
        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }
            db.view(designDocName, viewName, query, (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, result);
            });
        },
            dbName);

    } else {
        return callback(new Error('Invalid input parameters !'), null);
    }

    logger.exit('-', __filename);
}