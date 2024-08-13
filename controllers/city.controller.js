const db = require("../models");
const { City, Country } = { ...db };
const c = require('./common.controller');
const Op = db.Sequelize.Op;

const include = [
    {
        model: Country,
        as: 'country',
        attributes: ['countryName', 'countryCode']
    }]

const filter = { "isActive": true };
exports.findAll = (req, res) => {
    c.findAll(req, res, City, include, filter)
};
exports.findAllByCountry = (req, res) => {
    const _filter = { ...filter };
    _filter.countryId = req.params.countryId;
    c.findAll(req, res, City, include, _filter)
};
exports.findOne = (req, res) => {
    const _filter = { ...filter };
    _filter.id = req.params.id;
    c.findAll(req, res, City, include, _filter)
};

exports.update = (req, res) => { c.update(req, res, City) }
exports.delete = (req, res) => { c.delete(req, res, City) }
exports.restore = (req, res) => { c.restore(req, res, City) }

// Create and Save a new City
exports.create = (req, res) => {

    // Validate request
    if (!req.body.city || !req.body.countryId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a City
    const inputData = {
        city: req.body.city,
        countryId: req.body.countryId,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save City in the database
    City.create(inputData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the City."
            });
        });
};

