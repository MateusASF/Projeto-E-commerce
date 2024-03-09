// db.js
const oracledb = require("oracledb");

let connection;

module.exports.initialize = async function () {
    try {
        connection = await oracledb.getConnection({
            user: "PROJRODRIGO",
            password: "bancoRodrigo",
            connectString: "localhost/XE",
        });
    } catch (err) {
        console.error(err);
    }
};

module.exports.getConnection = function () {
    return connection;
};
