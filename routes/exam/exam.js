const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');
const verifyToken = require('../../auth');
const ExamModel = require('../../model').ExamModel;

// get all exams
router.get('/', verifyToken, (req, res) => {
    ExamModel.find({})
        .populate('training_centers')
        .exec((err, exams) => {
            if (err) return res.status(500).send({success: false, message: 'Error in retrieving exams', error: err});

            res.status(200).send({success: true,  data: exams, message: 'Successfully retrieved exams'});
        });
});

//exams/id
router.get('/:id', verifyToken, (req, res) => {
    const exam_id = req.params.id;

    ExamModel.findOne({_id: exam_id})
        .populate('training_centers')
        .exec((err, exam) => {
            if (err) return res.status(500).send({success: false, message: 'Error in retrieving exams', error: err});
            if (!exam) return res.status(404).send({success: true, message: 'Exam not found'});

            res.status(200).send({success: true, data: exam, message: 'Successfully retrieved exam'});
        });
});


// to register a new exam
router.post('/', verifyToken, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const amount = req.body.amount;
    const date = req.body.date;
    const training_centers = req.body.training_centers;

    ExamModel.create({
        name: name,
        description: description,
        amount: amount,
        date: date,
        training_centers: training_centers
    }, (err, newExam) => {
        if (err) return res.status(500).send({success: false, message: 'Error in adding Exam', error: err});

        return res.status(201).send({success: true,  data: newExam, message: 'Successfully added Exam'});
    });
});


module.exports = router;