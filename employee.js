/*
1. user should be able to add employees
    {
        name:'',
        email:'',
        employeeId:'',
        company:'',
        designation:''
    }
2. added employees should be displayed on the webpage in the form of a table
3. every added employee can be deleted/ remove
4. add edit feature for every employee under options section, 
when clicked on edit button, the data of the employee should be pre-populated in the form, 
upon submission of that form update record in the UI 
*/

const form = document.getElementById("form");
const tbody = document.getElementById("tbody");

const employees = [];

// it should take the details of an employee {object} and add this object to the table
function addEmployee(employee) {

    // check if the employee exist already in the array
    for(let i=0; i<employees.length; i++) {
        let e=employees[i];
        if(e.mail === employee.email) {
            alert("Email already exists");
            return;
        } else if(e.empId === employee.empId) {
            alert("Employee ID already exists");
            return;
        }
    }

    //  employee = undefined
    const tr = document.createElement("tr"); // <tr></tr>

    tr.innerHTML = `
        <td>${employee.name}</td>
        <td>${employee.email}</td>
        <td>${employee.empId}</td>
        <td>${employee.company}</td>
        <td>${employee.designation}</td>
        <td>
            <button onclick="deleteEmployee(this)" data-empid="${employee.empId}">Delete</button>
        </td>
    `;
    tbody.appendChild(tr);
    employees.push(employee);
    // after adding an employee clear the form
    form.reset();
}

//below function deleted the employee 
function deleteEmployee(buttonRef) {
    let empId = buttonRef.getAttribute("data-empId");

    //using the above empId delete the corresponding object in the employees array
    for(let i=0; i<employees.length; i++) {
        if(employees[i].empId === empId) {
            employees.splice(i, 1);
            break;
        }
    }

    // also remove the employee from the DOM tree 
    let parentTd = buttonRef.parentNode;
    let parentTr = parentTd.parentNode;

    // the below line removed the <tr></tr> from the DOM tree
    parentTr.remove();
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    let employee = {
        name: event.target.name.value, 
        email: event.target.email.value,
        empId: event.target.empId.value,
        company: event.target.company.value,
        designation: event.target.designation.value,
    };
    addEmployee(employee);
})