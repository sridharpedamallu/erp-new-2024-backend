const { now } = require("sequelize/lib/utils");
const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const c = require('./common.controller');

const jwt = require('jsonwebtoken');

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

const filter = {};

exports.findAll = (req, res) => { c.findAll(req, res, User, include, {}) };
exports.findAllByTenant = (req, res) => {
    const f = { tenantId: req.params.tenantId };
    c.findAll(req, res, User, include, f)
};
exports.findOne = (req, res) => {
    const _filter = { ...filter };
    _filter.id = req.params.id;
    c.findAll(req, res, User, include, _filter)
};
exports.update = (req, res) => { c.update(req, res, User) }
exports.delete = (req, res) => { c.delete(req, res, User) }
exports.restore = (req, res) => { c.restore(req, res, User) }

exports.auth = (req, res) => {
    User.findAll({ where: { email: req.body.email } }).then((data) => {
        if (data.length == 0) {
            res.status(404).send({
                message: `User Not found. Invalid Email or password.`
            });
        }
        else {
            if (data.password == null) {
                res.status(403).send({
                    message: `Need to set initial password`
                });
            } else {
                const date = now();
                const expireDate = date.setTime(date.getTime() + (60 * 60 * 1000)); // 1 hour to add as expiry

                res.send(jwt.sign({
                    email: req.body.email,
                    userType: req.body.userType,
                    tenantId: req.body.tenantId,
                    expires: expireDate
                }, '1f8b4166-4cd1-490a-9f9f-2e35ed711dbe'));
            }

        }
    })
}

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
    const user = {
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: null,
        isActive: req.body.isActive,
        userType: req.body.userType,
        tenantId: req.body.tenantId,
        deletedAt: null,
        createdBy: 1,
        updatedBy: 1,
    };

    // Save User in the database
    User.create(user)
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

