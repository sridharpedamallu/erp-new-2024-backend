const db = require("../models");
const { City, User, Country, ContactAddress } = { ...db };
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

exports.findAll = (req, res) => {
    filter.contactId = req.params.contactId
    c.findAll(req, res, ContactAddress, include, filter)
};

exports.findOne = (req, res) => {
    filter.contactId = req.params.contactId
    filter.id = req.params.id
    c.findOne(req, res, ContactAddress, include, filter)
};

exports.update = (req, res) => { c.update(req, res, ContactAddress) }
exports.delete = (req, res) => { c.delete(req, res, ContactAddress) }
exports.restore = (req, res) => { c.restore(req, res, ContactAddress) }

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body.city || !req.body.countryId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const city = {
        city: req.body.city,
        countryId: req.body.countryId,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save User in the database
    City.create(city)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

