const Student = require('../models/student.model');

exports.add = (req, res) => {

    console.log(req.body);
    if (!req.body.name) {
        return res.status(400).send({
            message: "Name cannot be empty"
        })
    }

    if (!req.body.age) {
        return res.status(400).send({
            message: "Age cannot be empty"
        })
    }

    if (!req.body.major) {
        return res.status(400).send({
            message: "Major cannot be empty"
        })
    }

    const student = new Student({
        name: req.body.name,
        age: req.body.age,
        major: req.body.major,
    });

    student.save()
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({
                message: "something went wrong while inserting data!"
            })
        });
}

exports.fetchAll = (req, res) => {
    Student.find().then(students => {
        res.send(students)
    }

    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}

exports.fetchSingle = (req, res) => {

    const id = req.params.id;

    Student.findById(id).then(students => {

        if (!students) {
            res.status(400).send({
                'message': 'Student not available!!',
                'error': err
            })
        }
        res.send(students)
    }

    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
}



exports.update = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({
            'message': 'Student name can not be empty'
        });
    }

    if (!req.body.age) {
        return res.status(400).send({
            message: "Age cannot be empty"
        })
    }

    if (!req.body.major) {
        return res.status(400).send({
            message: "Major cannot be empty"
        })
    }

    // Find student and update it with the request body
    Student.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        age: req.body.age,
        major: req.body.major,
    }, { new: true })
        .then(students => {
            if (!students) {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.id
                });
            }
            res.send(students);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Student not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Error updating student with id " + req.params.id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Student.findByIdAndRemove(id).then(students => {
        res.send({
            'message': 'Removed!'
        })
    }
    ).catch(err => {
        res.status(500).send({
            'message': 'Something went wrong!!',
            'error': err
        })
    })
};