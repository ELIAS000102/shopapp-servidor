const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  actualizarUsuario
} = require("../controllers/usuariosController");

router.post("/registro", registrarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", actualizarUsuario);

module.exports = router;
