const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
    // debug("debugging");
    res.send("<h1> Welcome to Mov! </h1>");
});

module.exports = router;