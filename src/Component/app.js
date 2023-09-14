const { remote } = require("electron");
const main  = require("./index");


const employees = document.querySelector("#employee");
const name = document.querySelector("#name");
const designation = document.querySelector("#designation");
const productsList = document.querySelector("#products");
 
let employee = [];
let editingStatus = false;
let editEmployeeId;
 
const deleteProduct = async (id) => {
  const response = confirm("Are you sure you want to delete it?");
  if (response) {
    await main.deleteProduct(id);
    await getProducts();
  }
  return;
};
 
const editProduct = async (id) => {
  const employee = await main.getProductById(id);
  name.value = employee.Name;
  designation.value = employee.Designation;
 
  editingStatus = true;
  editEmployeeId = id;
};
 
EmployeeForm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();
     debugger
    const employee = {
      name: name.value,
      designation: designation.value
    };
 
    if (!editingStatus) {
      const saveEmployee = await main.createProduct(employee);
      console.log(saveEmployee);
    } else {
      const employeeUpdated = await main.updateProduct(editEmployeeId, employee);
      console.log(employeeUpdated);
 
      //Reset
      editingStatus = false;
      editEmployeeId = "";
   }
 
   EmployeeForm.reset();
   name.focus();
    getProducts();
  } catch (error) {
    console.log(error);
  }
});
 
function renderProducts(tasks) {
    employees.innerHTML = "";
  tasks.forEach((t) => {debugger
    employees.innerHTML += `
      <div class="card card-body my-2 animated fadeInLeft ">
        <h4>${t.Name}</h4>
        <h3>${t.Designation}</h3>
        <p>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${t.Id}')">
          DELETE
        </button>
        <button class="btn btn-secondary btn-sm" onclick="editProduct('${t.Id}')">
          EDIT
        </button>
        </p>
      </div>
    `;
  });
}
 
const getProducts = async () => {
  employee = await main.getProducts();
  renderProducts(employee);
};
 
async function init() {
  getProducts();
}
 
init();