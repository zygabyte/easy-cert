const express = require('express');
const router = express.Router();

const app = express();
const superSecret = app.get('superSecret');
const verifyToken = require('../../auth');
const TrainingCenterModel = require('../../model').TrainingCenterModel;


// get all training centers
router.get('/', verifyToken, (req, res) => {
    TrainingCenterModel.find({}, (err, training_centers) => {
        if (err) return res.status(500).send({success: false, message: 'Error in retrieving training centers', error: err});

        res.status(200).send({success: true, data: training_centers, message: 'Successfully retrieved training centers'});
    });
});

//training centers/id
router.get('/:id', verifyToken, (req, res) => {
    const training_id = req.params.id;

    TrainingCenterModel.findOne({_id: training_id}, (err, training_center) => {
        if (err) return res.status(500).send({success: false, message: 'Error in retrieving training center', error: err});
        if (!training_center) return res.status(404).send({success: true, message: 'Training center not found'});

        res.status(200).send({success: true, data: training_center, message: 'Successfully retrieved training center'});
    });
});


// to register a new training centre
router.post('/', verifyToken, (req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const location = req.body.location;
    const exams = req.body.exams;

    TrainingCenterModel.create({
        name: name,
        description: description,
        location: location,
        exams: exams
    }, (err, newTrainingCenter) => {
        if (err) return res.status(500).send({success: false, message: 'Error in adding new Training Center', error: err});

        return res.status(201).send({success: true, data: newTrainingCenter, message: 'Successfully added Training Center'});
    });
});

module.exports = router;