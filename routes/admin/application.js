const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');
const verifyToken = require('../../auth');
const UserExamModel = require('../../model').UserExamModel;

router.put('/user-exam/:id/loan/:approval', verifyToken, (req, res) => {
    const user_exam_id = req.params.id;
    const approval_status = req.params.approval;

    UserExamModel.update({_id: user_exam_id}, {$set : {'loan.loan_status': approval_status}}, (err, updatedUserExam) => {
        if (err) return res.status(500).send({success: false, message: 'Error in updating User Exam with Loan application', error: err});
        return res.status(200).send({success: true, data: updatedUserExam, message: 'Successfully updated User Exam with Loan application'});
    })
});

router.put('/user-exam/:id/:approval', verifyToken, (req, res) => {
    const user_exam_id = req.params.id;
    const approval_status = req.params.approval;

    UserExamModel.update({_id: user_exam_id}, {$set : {exam_status: approval_status}}, (err, updatedUserExam) => {
        if (err) return res.status(500).send({success: false, message: 'Error in updating User Exam with Loan application', error: err});
        return res.status(200).send({success: true, data: updatedUserExam, message: 'Successfully updated User Exam with Loan application'});
    })
});

module.exports = router;