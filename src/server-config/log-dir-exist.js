module.exports = () => {
    return new Promise((resolve, reject) => {
        const
            fs = require('fs'),
            dir = global.webconfig.logging.log_dir;

        if (!fs.existsSync(dir)) {
            try {
                fs.mkdirSync(dir);
            } catch (err) {
                console.log(`${dir} directory does not exists !`);
                return reject(err);
            }
        }
        return resolve();
    });
}