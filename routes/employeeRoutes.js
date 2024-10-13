const express = require('express');
const router = express.Router();
const Employee = require('../models/employeeModel');

// GET /employees (Get all employees)
router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).send(employees);
    } catch (error) {
        res.status(500).send(error);
    }
});

// POST /employees (Create new employee)
router.post('/employees', async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();
        res.status(201).send({ message: "Employee created successfully.", employee_id: employee._id });
    } catch (error) {
        res.status(500).send(error);
    }
});

// GET /employees/:eid (Get employee by ID)
router.get('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.eid);
        if (!employee) return res.status(404).send({ message: "Employee not found" });
        res.status(200).send(employee);
    } catch (error) {
        res.status(500).send(error);
    }
});

// PUT /employees/:eid (Update employee by ID)
router.put('/employees/:eid', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
        if (!employee) return res.status(404).send({ message: "Employee not found" });
        res.status(200).send({ message: "Employee details updated successfully." });
    } catch (error) {
        res.status(500).send(error);
    }
});

// DELETE /employees (Delete employee by ID)
router.delete('/employees', async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.query.eid);
        if (!employee) return res.status(404).send({ message: "Employee not found" });
        res.status(204).send({ message: "Employee deleted successfully." });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
