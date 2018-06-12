const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');
const verifyToken = require('../../auth');
const UserExamModel = require('../../model').UserExamModel;

// get all userexams
router.get('/', verifyToken, (req, res) => {
    UserExamModel.find({})
        .populate('user')
        .populate('exam')
        .populate('loan')
        .exec((err, user_exams) => {
            if (err) return res.status(500).send({success: false, message: 'Error in retrieving user exams', error: err});

            res.status(200).send({success: true,  data: user_exams, message: 'Successfully retrieved user exams'});
        });
});

//userexams/id
router.get('/:id', verifyToken, (req, res) => {
    const user_exam_id = req.params.id;

    UserExamModel.findOne({_id: user_exam_id})
        .populate('user')
        .populate('exam')
        .populate('loan')
        .exec((err, user_exam) => {
            if (err) return res.status(500).send({success: false, message: 'Error in retrieving User Exam', error: err});
            if (!user_exam) return res.status(404).send({success: true, message: 'User Exam not found'});

            res.status(200).send({success: true, data: user_exam, message: 'Successfully retrieved User Exam'});
        });
});

// to register a new user exam
router.post('/', verifyToken, (req, res) => {
    const user = req.body.user;
    const exam = req.body.exam;
    const loan = req.body.loan;
    const exam_status = req.body.exam_status;
    const bank_statement = req.body.bank_statement;
    const staff_id = req.body.staff_id;
    const tax_id = req.body.tax_id;
    const employment_letter = req.body.employment_letter;
    const utility_bill = req.body.utility_bill;
    const bvn = req.body.bvn;

    UserExamModel.create({
        user: user,
        exam: exam,
        loan: loan,
        exam_status: exam_status,
        bank_statement: bank_statement,
        staff_id: staff_id,
        tax_id: tax_id,
        employment_letter: employment_letter,
        utility_bill: utility_bill,
        bvn: bvn
    }, (err, newUserExam) => {
        if (err) return res.status(500).send({success: false, message: 'Error in adding new User Exam', error: err});

        return res.status(201).send({success: true, data: newUserExam, message: 'Successfully added User Exam'});
    });
});

// update a user exam with the loan application
router.put(':id/loan', verifyToken, (req, res) => {
    const user_exam_id = req.params.id;
    const loan = req.body.loan;

    UserExamModel.update({_id: user_exam_id}, {$set : {loan: loan}}, (err, updatedUserExam) => {
        if (err) return res.status(500).send({success: false, message: 'Error in updating User Exam with Loan application', error: err});
        return res.status(200).send({success: true, data: updatedUserExam, message: 'Successfully updated User Exam with Loan application'});
    })
});

module.exports = router;