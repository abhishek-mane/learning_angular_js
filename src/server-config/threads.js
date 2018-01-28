const
    logger = require(global.webconfig.logging.logger),
    threads = require('threads'),
    { config } = threads,
    { spawn } = threads;


module.exports = () => {

    logger.task('Initialize threads');

    return new Promise((resolve) => {
        logger.enter('-', __filename);

        config.set({
            basepath: {
                node: global.webconfig.path.lib
            }
        });
        const
            streaming_thread = spawn('streaming/index.js'),
            analysis_thread = spawn('analysis/index.js');

        streaming_thread.send(global.webconfig).
            on('message', function (response) {
                logger.info(response);
            }).
            on('error', function (err) {
                logger.error(`Streaming thread aborted unexpectedly ! \n${err.stack}`);
                streaming_thread.kill();
            }).
            on('exit', function () {
                logger.warn('Streaming has been terminated !');
            });

        analysis_thread.send(global.webconfig).
            on('message', function (response) {
                logger.info(response);
            }).
            on('error', function (err) {
                logger.error(`Analyzer thread aborted unexpectedly ! \n${err.stack}`);
                streaming_thread.kill();
            }).
            on('exit', function () {
                logger.warn('Analyzer has been terminated !');
            });

        logger.exit('-', __filename);
        return resolve();
    });
}