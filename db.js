const sql = require("mssql");
require("dotenv").config();

const config = {
  user: "Admin_ZenaydaStore",
  password: "evangelioEVA01",
  server: "sqlserver-zenaydastore.database.windows.net",
  database: "shoppAppDataBase",
  options: {
    encrypt: true,
  },
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("✅ Conectado a Azure SQL Database");
    return pool;
  })
  .catch(err => {
    console.error("❌ Error de conexión con Azure SQL:", err);
    throw err;
  });

module.exports = {
  sql,
  poolPromise,
};
