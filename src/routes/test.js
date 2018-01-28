const
    path = require('path'),
    express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    return res.json({
        'status': 'Call worked !'
    })
});

//export this router to use in our index.js
module.exports = router;