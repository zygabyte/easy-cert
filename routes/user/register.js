const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();


router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    bcrypt.hash(password, 5, (err, hashedPassword) => {
        if (err) return res.status(500).send({success: false, message: err});

        console.log('hashed password ', hashedPassword);

        // now insert into db here
    });
});



module.exports = router;