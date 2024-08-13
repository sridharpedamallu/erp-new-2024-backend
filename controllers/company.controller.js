const db = require("../models");
const { Country, Company, Currency } = { ...db };
const c = require('./common.controller');
const Op = db.Sequelize.Op;

const include = [
    {
        model: Currency,
        as: 'currency',
        attributes: ['currencyName', 'currencyCode']
    },
    {
        model: Country,
        as: 'country',
        attributes: ['countryName', 'countryCode']
    }]

const filter = { "isActive": true };

exports.findAll = (req, res) => {
    c.findAll(req, res, Company, include, filter)
};
exports.findAllByTenantId = (req, res) => {
    const _filter = { ...filter };
    _filter.tenantId = req.params.tenantId
    c.findAll(req, res, Company, include, _filter)
};
exports.findOne = (req, res) => {
    const _filter = { ...filter };
    _filter.id = req.params.id;
    c.findAll(req, res, Company, include, _filter)
};

exports.update = (req, res) => { c.update(req, res, Company) }
exports.delete = (req, res) => { c.delete(req, res, Company) }
exports.restore = (req, res) => { c.restore(req, res, Company) }


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

