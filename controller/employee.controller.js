const Employee = require('../model/Employee');

const getAllEmployee = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

const addEmployee = async (req, res) => {

    if(!req.body.firstName || !req.body.lastName) {
        return res.status(400).json({message: `First and last Name are required`});
    }
    const newEmployee = await Employee.create({
        firstName: req.body.firstname,
        lastName:req.body.lastname
    })
    res.status(201).json(newEmployee);
}

const updateEmployee = (req, res) => {
    const id = req.body.id;
    const lastName = req.body.lastname;
    const employee = data.employees.find((emp) => emp.id === id)
    if (!employee) {
        return res
            .status(404)
            .json({ success: false, message: `no person exits with id ${id}` });
    }

    const updatedEmployee = data.employees.map((emp) => {
        if (employee.id === emp.id) {
            emp.lastname = lastName;
        }
        return emp;
    })
    res.json({ success: true, updatedEmployee });
}

const deleteEmployee = (req, res) => {
    const id = req.body.id;
    const findPerson = data.employees.find((emp) => emp.id === id);

    if (!findPerson) {
        return res.status(404).json({ success: false, message: `Not found any employee with id ${id}` });
    }
    data.employees = data.employees.filter((emp) => emp.id !== findPerson.id)
    res.status(200).json({ success: true, message: 'successfully deleted', findPerson });
}


const getEmployee = (req, res) => {
    const id = parseInt(req.params.id);

    const findPerson = data.employees.find((emp) => emp.id === id);
    if(!findPerson) {
        return res.status(404).json({success:false, message: `Not found any employee with id ${id}`});
    }
    res.status(200).json({success: true, findPerson});
}

module.exports = {
    getAllEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}