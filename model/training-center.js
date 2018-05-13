const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TrainingCenterSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    location: {
        longitude: {type: Number, required: true},
        latitude: {type: Number, required: true}
    },
    exams: [
        {
            exam:  {type: Schema.Types.ObjectId, ref: 'Exam'},
            training_price: {
                    value: {type: Number},
                    currency: {type: String, enum: ['dollars', 'naira', 'pounds', 'euro'], default: 'dollars'},
                    symbol: {type: String, enum: ['$', '₦', '£', '€'], default: '$'}
            },
            training_date: {
                    start: {type: Date},
                    end: {type: Date}
            }
        }
    ]
});

module.exports = mongoose.model('TrainingCenter', TrainingCenterSchema);