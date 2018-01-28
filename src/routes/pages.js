const
    express = require('express'),
    router = express.Router();

router.get('/list-dbs', (req, res) => {
    return res.render('ng-views/list-dbs.html');
});

router.get('/list-docs', (req, res) => {
    return res.render('ng-views/list-docs.html');
});

router.get('/create-db', (req, res) => {
    return res.render('ng-views/create-db.html');
});

router.get('/add-doc', (req, res) => {
    return res.render('ng-views/add-doc.html');
});

//export this router to use in our index.js
module.exports = router;