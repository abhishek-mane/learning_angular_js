const
    logger = require(global.webconfig.logging.logger);

module.exports = (dbName, callback) => {
    logger.enter('-', __filename);
    logger.data('dbName', dbName)

    if (dbName && typeof (dbName) === typeof ('')) {
        let dbConnect = require('./db.connect');
        dbConnect((err, db) => {
            if (err) {
                return callback(err, null);
            }
            db.list({
                include_docs: true
            }, (err, result) => {
                if (err) {
                    return callback(err, null);
                }
                return callback(null, (result.rows.map((element) => element.doc)).filter((doc) => !doc._id.includes('_design/')));
            });
        }, dbName);

    } else {
        return callback(new Error('Invalid input parameters !'), null);
    }

    logger.exit('-', __filename);
}