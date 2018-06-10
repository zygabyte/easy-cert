const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');
const UserModel = require('../../model').UserModel;

// to register a new user
router.post('/register', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const phone_number = req.body.phone_number;
    const role = req.body.role;

    bcrypt.hash(password, 5, (err, hashedPassword) => {
        if (err) return res.status(500).send({success: false, message: 'Error in hashing user password', error: err});

        console.log('hashed password ', hashedPassword);

        UserModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname,
            phone_number: phone_number,
            role: role
        }, (err, newUser) => {
            if (err) {
                if (err.message.indexOf('E11000') > -1) res.status(500).send({success: false, message: 'Duplicate email', error: err}); // duplicate email
                return;
            }

            const token = jwt.sign(newUser, superSecret, {expiresIn: '24h'});
            return res.status(201).send({success: true,  data: newUser, token: token, message: 'Successfully added user'});
        });
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    // login logic
    UserModel.findOne({email: email}, (err, user) => {
        if (err) return res.status(500).send({success: false, message: 'Error in retrieving user', error: err});
        if (!user) return res.status(404).send({success: false, message: 'No user with such credentials exist'});

        bcrypt.compare(password, user.password, (err, doesMatch) => {
            if (err) return res.status(500).send({success: false, message: 'Error in retrieving user\'s password', error: err});
            if (doesMatch) res.status(200).send({success: true, message: 'Wrong username and password combination'});

            const token = jwt.sign(user, superSecret, {expiresIn: '24h'});
            return res.status(200).send({success: true,  data: user, token: token, message: 'Successfully retrieved user'});
        });
    });

});

module.exports = router;