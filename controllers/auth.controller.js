const db = require("../models");
const { User, ResetPassword } = { ...db };
// const Op = db.Sequelize.Op;

exports.login = (req, res) => {

    User.findAll({
        where: { email: req.body.email }
    })
        .then(data => {
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
            res.json(data[0]);
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


