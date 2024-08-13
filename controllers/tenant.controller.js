const db = require("../models");
const { Tenant, User } = { ...db };

const Op = db.Sequelize.Op;
const c = require('./common.controller');

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

exports.findAll = (req, res) => { c.findAll(req, res, Tenant, include, filter) };
exports.findOne = (req, res) => { c.findOne(req, res, Tenant, include) };
exports.update = (req, res) => { c.update(req, res, Tenant) }
exports.delete = (req, res) => { c.delete(req, res, Tenant) }
exports.restore = (req, res) => { c.restore(req, res, Tenant) }

// Create and Save a new User
exports.create = (req, res) => {

    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a User
    const tenant = {
        name: req.body.name,
        email: req.body.email,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save User in the database
    Tenant.create(tenant)
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

