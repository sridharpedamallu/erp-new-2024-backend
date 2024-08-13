const db = require("../models");
const { Country, User } = { ...db };
const c = require('./common.controller');

const Op = db.Sequelize.Op;
const include = [

    {
        model: User,
        as: 'creator',
        attributes: ['name']
    },
    {
        model: User,
        as: 'updator',
        attributes: ['name']
    }];

const filter = { "isActive": true };

exports.findAll = (req, res) => { c.findAll(req, res, Country, include, filter) };
exports.findOne = (req, res) => { c.findOne(req, res, Country, include) };
exports.update = (req, res) => { c.update(req, res, Country) }
exports.delete = (req, res) => { c.delete(req, res, Country) }
exports.restore = (req, res) => { c.restore(req, res, Country) }

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body.countryName || !req.body.countryCode) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const country = {
        countryCode: req.body.countryCode,
        countryName: req.body.countryName,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save User in the database
    Country.create(country)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Country."
            });
        });
};

