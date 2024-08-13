const db = require("../models");
const { User, Company, Contact } = { ...db };
const c = require('./common.controller');
const Op = db.Sequelize.Op;

const include = [
    {
        model: Company,
        as: 'company',
        attributes: ['name']
    },
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
    filter.companyId = req.params.companyId
    c.findAll(req, res, Contact, include, filter)
};
exports.findOne = (req, res) => {
    filter.companyId = req.params.companyId
    filter.id = req.params.id
    c.findAll(req, res, Contact, include, filter)
};
exports.update = (req, res) => { c.update(req, res, Contact) }
exports.delete = (req, res) => { c.delete(req, res, Contact) }
exports.restore = (req, res) => { c.restore(req, res, Contact) }

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name || !req.body.companyId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        designation: req.body.designation,
        tenantId: req.body.tenantId,
        companyId: req.body.companyId,
        isActive: true,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save User in the database
    Contact.create(contact)
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
