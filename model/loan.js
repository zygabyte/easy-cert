const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    application_date: {type:  Date},
    loan_status: {type: String, enum: ['approved', 'disapproved'], default: 'disapproved'}
});

module.exports = mongoose.Model('Loan', LoanSchema);