const { sql, poolPromise } = require("../db");

const registrarUsuario = async (req, res) => {
  const { username, email, password, profilePhoto, phone, address, status } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("profilePhoto", sql.NVarChar, profilePhoto)
      .input("phone", sql.NVarChar, phone)
      .input("address", sql.NVarChar, address)
      .input("status", sql.NVarChar, status)
      .query(`
        INSERT INTO Usuarios (username, email, password, profilePhoto, phone, address, status)
        VALUES (@username, @email, @password, @profilePhoto, @phone, @address, @status)
      `);
    res.status(201).send("Usuario registrado");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al registrar usuario");
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .query("SELECT * FROM Usuarios WHERE email = @email AND password = @password");

    if (result.recordset.length > 0) {
      res.json({ mensaje: "Login exitoso", usuario: result.recordset[0] });
    } else {
      res.status(401).send("Credenciales inválidas");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al iniciar sesión");
  }
};

const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, profilePhoto, phone, address, status } = req.body;

  try {
    const pool = await poolPromise;
    await pool.request()
      .input("id", sql.Int, id)
      .input("username", sql.NVarChar, username)
      .input("email", sql.NVarChar, email)
      .input("password", sql.NVarChar, password)
      .input("profilePhoto", sql.NVarChar, profilePhoto)
      .input("phone", sql.NVarChar, phone)
      .input("address", sql.NVarChar, address)
      .input("status", sql.NVarChar, status)
      .query(`
        UPDATE Usuarios
        SET username = @username,
            email = @email,
            password = @password,
            profilePhoto = @profilePhoto,
            phone = @phone,
            address = @address,
            status = @status
        WHERE id = @id
      `);
    res.send("Usuario actualizado");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error al actualizar usuario");
  }
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  actualizarUsuario
};
