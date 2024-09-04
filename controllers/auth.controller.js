const db = require("../models");
const { User, ResetPassword, TenantLoginSetup, TenantLoginDomain } = { ...db };
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {

    User.findAll({
        where: { email: req.body.email }
    })
        .then(async data => {
            if (data.length == 0) {
                res.status(404).send('User not found');
                return;
            }
            if (data[0].password == null) {
                res.status(500).send('Password reset required');
                return;
            }
            if (data[0].password != req.body.password) {
                res.status(404).send('Invalid credentials');
                return;
            }
            if (data[0].userType != 999 && data[0].tenantId == null) {
                res.status(500).send('Tenant not assigned to this user, Invalid user');
                return;
            }

            if (data[0].tenantId != null) {
                const settings = await TenantLoginSetup.findAll({ where: { tenantId: data[0].tenantId } });
                const domains = await TenantLoginDomain.findAll({ where: { tenantId: data[0].tenantId } });

                if (settings[0]?.domainRestricted) {
                    const tempDomains = domains.map(row => row.domain);
                    const emailDomain = req.body.email.split("@")[1];
                    if (tempDomains.find(t => t == emailDomain) == undefined) {
                        res.status(500).send('Email domain not allowed to login. contact your support team');
                        return;
                    }
                }
            }

            const loginData = {
                "id": data[0].id,
                "name": data[0].name,
                "phone": data[0].phone,
                "email": data[0].email,
                "userType": data[0].userType,
                "tenantId": data[0].tenantId,
                "isActive": data[0].isActive,
                "loginTime": Date.now()
            }

            const token = jwt.sign({ ...loginData }, 'mySecretKey');
            res.json({ "token": token, ...loginData });
        });

};

exports.generateOTP = (req, res) => {
    const otp = '123123';
    User.findAll({
        where: { email: req.body.email }
    })
        .then((data) => {
            if (data.length == 0) {
                res.status(404).send('User not found');
                return;
            }

            ResetPassword.create({ email: req.body.email, otp: otp }).then(data => {
                res.json({ otp });

            })



        });
}

exports.verifyOTP = async (req, res) => {

    const data = await ResetPassword.findOne({ where: { email: req.body.email, otp: req.body.otp } });
    console.log(req.body);
    if (data != null) {
        await User.update({ password: req.body.password }, { where: { email: req.body.email } });
        await ResetPassword.destroy({ where: { id: data.id } });
        res.json({ result: true });
    } else {
        res.json({ result: false });
    }
}


