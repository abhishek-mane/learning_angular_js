const
    session = require('express-session'),
    logger = require(global.webconfig.logging.logger)

module.exports = (app) => {

    logger.task('Initialize express session');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use(session({
            secret: 'a4f8071f-c873-4447-8ee2',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: false }
        }));

        logger.exit('-', __filename);

        return resolve();
    });
}