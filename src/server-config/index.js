module.exports = {
    logDirCheck:        require('./log-dir-exist'),
    initBodyParser:     require('./body-parser'),
    initCookieParser:   require('./cookie-parser'),
    initServeStatic:    require('./serve-static'),
    initViewEngine:     require('./view-engine'),
    initRoutes:         require('./routes'),
    initMorgan:         require('./morgan'),
    initSession:        require('./session'),
    initPassport:       require('./passport'),
    initServer:         require('./server'),
    initPageNotFound:   require('./page-not-found.js'),
};