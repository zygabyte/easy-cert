const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('login', (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // login logic
});

module.exports = router;