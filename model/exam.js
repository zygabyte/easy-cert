const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    amount: {
        value: {type: Number, required: true},
        currency: {type: String, enum: ['dollars', 'naira', 'pounds', 'euro'], default: 'dollars'},
        symbol: {type: String, enum: ['$', '₦', '£', '€'], default: '$'}
    },
    date: {type: Date, required: true},
    training_centers: [{type: Schema.Types.ObjectId, ref: 'TrainingCenter'}]
});

module.exports = mongoose.model('Exam', ExamSchema);