let
    path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    logger = require(global.webconfig.logging.logger);

module.exports = (app) => {

    logger.task('Initialize passport authentication');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        app.use(passport.initialize());
        app.use(passport.session());

        // passport serialization function
        passport.serializeUser((user, done) => {
            done(null, user);
        });

        // passport deserialization function
        passport.deserializeUser((user, done) => {
            done(null, user);
        });

        // passport's local strategy declaration
        passport.use(new LocalStrategy((username, password, done) => {
            logger.enter('passport-LocalStrategy', __filename);

            logger.data('username', username);
            logger.data('password', password);

            const { authenticateUser } = require(path.join(global.webconfig.path.models, 'user'));
            authenticateUser(username, password, (err, success, user) => {
                if (err) {
                    return done(err);
                }
                if (!success) {
                    return done(null, false);
                }
                return done(null, true, user);
            });

            logger.exit('passport-LocalStrategy', __filename);
        }));
        logger.exit('-', __filename);

        return resolve();
    });
};