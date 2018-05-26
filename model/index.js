const mongoose = require('mongoose');
const mongoDBURL = process.env.MONGODBURL
    || '';

mongoose.connect(mongoDBURL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error'));

module.exports = {
  UserModel : require('./user'),
  ExamModel : require('./exam'),
  TrainingCenterModel : require('./training-center'),
  UserExamModel : require('./user-exam')
};