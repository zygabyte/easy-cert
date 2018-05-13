const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone_number: {type: String, required: true},
    password: {type: String, required: true},
    passport: {data: Buffer, contentType: String},
    role: {type: String, enum: ['individual', 'corporate_admin', 'corporate_user', 'admin'], default: 'individual'}
});

module.exports = mongoose.model('User', UserSchema);