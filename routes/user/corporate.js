const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');


router.post('/corporate/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;

    bcrypt.hash(password, 5, (err, hashedPassword) => {
        if (err) return res.status(500).send({success: false, message: err});

        console.log('hashed password ', hashedPassword);

        // now insert into db here

        const token = jwt.sign('', superSecret, {expiresIn: '24h'});

    });
});

router.post('/corporate/login', (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // login logic
    bcrypt.compare(password,  'password from db',  (err, doesMatch) => {
        if (err) return res.status(500).send({success: false, message: err});

        if (doesMatch) {
            const token = jwt.sign('', superSecret, {expiresIn: '24h'});
        }

    });
});




// CORPORATE ADMIN
router.post('/corporate/admin/login', (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // login logic
    bcrypt.compare(password,  'password from db',  (err, doesMatch) => {
        if (err) return res.status(500).send({success: false, message: err});

        if (doesMatch) {
            const token = jwt.sign('', superSecret, {expiresIn: '24h'});
        }

    });
});

module.exports = router;