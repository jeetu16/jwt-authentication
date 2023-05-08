const Employee = require('../model/Employee');

const getAllEmployee = async (req, res) => {
    const employees = await Employee.find();
    res.json(employees);
}

const addEmployee = async (req, res) => {

    if(!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ message: `First and Last Name are required` });
    }
    try {
        const newEmployee = await Employee.create({
            firstname: req.body.firstname,      
            lastname: req.body.lastname
        })
        res.status(201).json(newEmployee);
    } catch (err) {
        console.log(err);
    }
}

const updateEmployee = async (req, res) => {
    if(!req?.body?._id) return res.status(400).json({"message":"ID parameter are required."})
    const id = req.body._id;
    try {
        const updateEmployee = await Employee.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json({ success: true, updateEmployee });
        console.log(updateEmployee);
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ success: false, message: `No Employee exits with id ${id}` });
    }
}

const deleteEmployee = async (req, res) => {

    const id = req.body._id;
    try {
        const findUser = await Employee.findByIdAndDelete(id);
        res.status(200).json({sucess:true,deletedUser:findUser})

    } catch(err) {
        console.log(err);
        res.status(404).json(err.message);
    }
}


const getEmployee = async (req, res) => {
    
    if(!req?.params?.id) return res.status(400).json({ message:"Please Provide User ID" });

    try {
        const findPerson = await Employee.findOne({ _id: req.params.id }, { _id: 0, __v: 0 });
        if (!findPerson) return res.status(404).json({ success: true, message: `Not found any employee with id ${req.params.id}` });
        res.status(200).json({ success: true, user: findPerson });
    } catch (err) {
        return res.status(500).json({ success: false, message: `Not found any employee with id ${req.params.id}` });
    }
}

module.exports = {
    getAllEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}