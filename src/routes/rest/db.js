const
    express = require('express'),
    router = express.Router();

router.get('/', (req, res) => {
    return res.json([
        'db1', 'db2'
    ]);
});

//export this router to use in our index.js
module.exports = router;