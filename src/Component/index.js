
const { BrowserWindow, Notification } = require("electron");
const { getConnection } = require("../Database/DB");
 
const createProduct = async (employee) => {
  try {
    const conn = await getConnection();
    const result = await conn.query("INSERT INTO employee SET ?", employee);
    employee.Id = result.insertId;
 
    // Notify the User
    new Notification({
      title: "Electron Mysql",
      body: "New Product Saved Successfully",
    }).show();
 
    // Return the created Product
    return product;
  } catch (error) {
    console.log(error);
  }
};
 
const getProducts = async () => {
  const conn = await getConnection();
  const results = await conn.query("SELECT * FROM employee ORDER BY Id DESC");
  return results;
};
 
const deleteProduct = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("DELETE FROM employee WHERE Id = ?", id);
  return result;
};
 
const getProductById = async (id) => {
  const conn = await getConnection();
  const result = await conn.query("SELECT * FROM employee WHERE Id = ?", id);
  return result[0];
};
 
const updateProduct = async (id, product) => {
  const conn = await getConnection();
  const result = await conn.query("UPDATE employee SET ? WHERE Id = ?", [
    product,
    id,
  ]);
};
  
module.exports = {
  createProduct,
  getProducts,
  deleteProduct,
  getProductById,
  updateProduct
};