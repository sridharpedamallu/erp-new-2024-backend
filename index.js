const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

// var corsOptions = {
//     origin: "http://localhost:8081"
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./models");
db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

const myLogger = function (req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.use(myLogger)

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to bezkoder application." });
});

app.use("/api/users", require("./routes/user.routes"));
app.use("/api/cities", require("./routes/city.routes"));
app.use("/api/countries", require("./routes/country.routes"));
app.use("/api/contacts", require("./routes/contact.routes"));
app.use("/api/contact-addresses", require("./routes/contactaddress.routes"));
app.use("/api/companies", require("./routes/company.routes"));
app.use("/api/currencies", require("./routes/currency.routes"));
app.use("/api/tenants", require("./routes/tenant.routes"));
app.use("/api/auth", require("./routes/auth.routes"));


// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});