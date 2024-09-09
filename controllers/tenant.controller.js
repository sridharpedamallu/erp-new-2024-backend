const db = require("../models");
const { Tenant, User, TenantLoginSetup, TenantLoginDomain } = { ...db };
const jwt = require('jsonwebtoken');

const Op = db.Sequelize.Op;
const { Sequelize } = require('sequelize');

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
    }, { model: User, as: 'users', attributes: [] }];

const filter = { "isActive": true };

// exports.findAll = (req, res) => { c.findAll(req, res, Tenant, include, filter) };
exports.findAll = (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');
    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }

    Tenant.findAll({
        where: { ...filter },
        include,
        attributes: {
            include: [
                [Sequelize.fn('COUNT', Sequelize.col('users.id')), 'userCount']
            ]

        },
        group: ['Tenant.id', 'creator.id', 'updator.id']

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
exports.findOne = (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }
    c.findOne(req, res, Tenant, include)
};
exports.update = (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }
    c.update(req, res, Tenant)
}
exports.delete = (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }
    c.delete(req, res, Tenant)
}
exports.restore = (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }
    c.restore(req, res, Tenant)
}

// Create and Save a new User
exports.create = (req, res) => {

    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }

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
        phone: req.body.phone,
        createdBy: token.id,
        updatedBy: token.id,
    };

    Tenant.findOne({ where: { email: tenant.email } }).then(tenantData => {
        if (tenantData) {
            res.status(500).send({
                message: "Email already in use"
            });
        } else {
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
        }
    })


};

exports.getLoginSettings = async (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }

    const settings = await TenantLoginSetup.findAll({ where: { tenantId: req.params.id } });
    const domains = await TenantLoginDomain.findAll({ where: { tenantId: req.params.id } });
    if (settings.length == 0) {
        settings.push({
            id: req.params.id,
            domainRestricted: false,
            clientLoginAccess: false
        });
    }
    res.send({ loginSettings: settings[0], domains: domains.map(row => row.domain) })
}

exports.setLoginSettings = async (req, res) => {
    const token = jwt.verify(req.headers.authorization.split(' ')[1], 'mySecretKey');

    if (token.userType != 999) {
        res.status(500).send({
            message:
                err.message || "User type is not authorised to view this data"
        });
        return;
    }
    const loginSettings = {
        domainRestricted: req.body.domainRestricted,
        clientLoginAccess: req.body.clientLoginAccess,
        tenantId: +req.params.id,
        createdBy: 1,
        updatedBy: 1,
    };
    const domainData = [];
    const inputDomains = [...req.body.domains];
    inputDomains.map((d) => {
        domainData.push({
            domain: d,
            accessGranted: true,
            tenantId: req.params.id,
            createdBy: 1,
            updatedBy: 1,
        })
    })

    await TenantLoginSetup.destroy({
        where: { tenantId: +req.params.id }
    });
    const resultData = await TenantLoginSetup.create(loginSettings);

    await TenantLoginDomain.destroy({
        where: { tenantId: +req.params.id }
    })
    const result2 = await TenantLoginDomain.bulkCreate(domainData);

    res.send({ loginSettings: resultData, domains: result2 });
}

