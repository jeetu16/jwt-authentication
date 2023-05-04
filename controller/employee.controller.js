const data = {
    employees: require('../model/employee.model.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployee = (req, res) => {
    res.json(data.employees);
}

const addEmployee = (req, res) => {
    const newEmployee = {
        id: data.employees ? data.employees[data.employees.length-1].id +1  : 1,
        firstName: req.body.firstname,
        lastName:req.body.lastname
    }

    if(!newEmployee.firstName || !newEmployee.lastName) {
        return res.status(400).json({message: `First and last Name are required`});
    }

    data.setEmployees([...data.employees,newEmployee]);
    res.status(201).json(data.employees);
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