const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserExamSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    exam: {type: Schema.Types.ObjectId, ref: 'Exam'},
    bank_statement: {data: Buffer, contentType: String},
    staff_id: {data: Buffer, contentType: String},
    tax_id: {type: String},
    employment_letter: {data: Buffer, contentType: String},
    utility_bill: {data: Buffer, contentType: String},
    bvn: {type: Number},
    loan_status: {type: String, enum: ['approved', 'disapproved'], default: 'disapproved'},
});

module.exports = mongoose.model('UserExam', UserExamSchema);