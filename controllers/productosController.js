// controllers/productosController.js
const { sql, poolPromise } = require("../db");

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM Productos");

    // 👉 Imprimir en consola los productos recuperados
    console.log("Productos obtenidos desde la base de datos:");
    console.log(result.recordset);

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ Error al obtener productos:", err);
    res.status(500).send("Error al obtener productos");
  }
};

// Crear nuevo producto
const crearProducto = async (req, res) => {
  const { name, price, imageUrl, categories, description, stock } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("name", sql.NVarChar, name)
      .input("price", sql.Float, price)
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("categories", sql.NVarChar, JSON.stringify(categories)) // Guardar como JSON string
      .input("description", sql.NVarChar, description)
      .input("stock", sql.Int, stock).query(`
        INSERT INTO Productos (name, price, imageUrl, categories, description, stock)
        VALUES (@name, @price, @imageUrl, @categories, @description, @stock)
      `);
    res.status(201).send("Producto creado correctamente");
  } catch (err) {
    console.error("Error al crear producto:", err);
    res.status(500).send("Error al crear producto");
  }
};

// Actualizar producto
const actualizarProducto = async (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl, categories, description, stock } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("name", sql.NVarChar, name)
      .input("price", sql.Float, price)
      .input("imageUrl", sql.NVarChar, imageUrl)
      .input("categories", sql.NVarChar, JSON.stringify(categories))
      .input("description", sql.NVarChar, description)
      .input("stock", sql.Int, stock).query(`
        UPDATE Productos
        SET name = @name,
            price = @price,
            imageUrl = @imageUrl,
            categories = @categories,
            description = @description,
            stock = @stock
        WHERE id = @id
      `);
    res.send("Producto actualizado correctamente");
  } catch (err) {
    console.error("Error al actualizar producto:", err);
    res.status(500).send("Error al actualizar producto");
  }
};

// Eliminar producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Productos WHERE id = @id");

    res.send("Producto eliminado correctamente");
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).send("Error al eliminar producto");
  }
};

// Exportar todos los controladores
module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
