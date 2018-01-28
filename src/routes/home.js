const
    express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    return res.render('index.html');
});

//export this router to use in our index.js
module.exports = router;