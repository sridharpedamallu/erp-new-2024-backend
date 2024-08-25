const db = require("../models");
const { User } = { ...db };

const common_include = [
    {
        model: User,
        as: 'creator',
        attributes: ['name']
    },
    {
        model: User,
        as: 'updator',
        attributes: ['name']
    }]

const common_filter = {};

// Retrieve all records from the database.
exports.findAll = (req, res, _model, _include = [], _filter = {}) => {
    const include = [..._include, ...common_include];
    const filter = _filter == undefined ? { ...common_filter } : { ..._filter }

    _model.findAll({
        where: { ...filter },
        include
    })
        .then(data => {
            if (filter.id != undefined) {
                if (data.length == 0) {
                    res.status(404).send({
                        message: `Cannot find data with id=${filter.id}.`
                    });
                } else {
                    res.send(data[0]);
                }
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving data."
            });
        });
};

// Find a single record with an id
exports.findOne = (req, res, model, include) => {
    const id = req.params.id;

    model.findByPk(id, {
        include
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find data with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving data with id=" + id
            });
        });
};

// Update a record by the id in the request
exports.update = (req, res, model) => {
    const id = req.params.id;

    model.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Record was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update record with id=${id}. Maybe record was not found or input data is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating record with id=" + id
            });
        });
};

// // Delete a record with the specified id in the request
exports.delete = (req, res, model) => {
    const id = req.params.id;

    model.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Record was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete record with id=${id}. Maybe record was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
};

// // Restore a deleted User with the specified id in the request
exports.restore = (req, res, model) => {
    const id = req.params.id;

    model.restore({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Record was restored successfully!"
                });
            } else {
                res.send({
                    message: `Cannot restore record with id=${id}. Maybe record was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete record with id=" + id
            });
        });
};