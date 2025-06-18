const Employee = require("../models/employee");
const Departments = require("../models/bankMaster");
const Nature = require("../models/prodNature");
const Shifts = require("../models/prodShifts");
const fs = require('fs');
const csv = require('csv-parser');
const path = require("path");
const { employeeSchema, masterDataSchema } = require('../helpers/employee');


const uploadEmployee = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const filePath = path.resolve(req.file.path);
        const results = [];
        try {
            // Read and parse CSV
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    results.push(employeeSchema(row));
                })
                .on("end", async () => {
                    try {
                        // Save to DB
                        console.log("Inserting data into DB:", results);
                        await Employee.insertMany(results);
                        fs.unlinkSync(filePath); // delete temp file
                        res.status(200).json({ message: "Employees uploaded successfully" });
                    } catch (err) {
                        console.error("DB insert error:", err);
                        res.status(500).json({ message: "Failed to save employees" });
                    }
                });
        } catch (err) {
            console.error("File read error:", err);
            res.status(500).json({ message: "Failed to process file" });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error creating employee data",
            error: error.message,
        });
    }
};

const uploadMasterData = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const filePath = path.resolve(req.file.path);
        const results = [];

        try {
            // Read and parse CSV
            fs.createReadStream(filePath)
                .pipe(csv())
                .on("data", (row) => {
                    results.push(masterDataSchema(row));
                })
                .on("end", async () => {
                    try {
                        // Save to DB
                        console.log("Inserting data into DB:", results);
                        await Departments.insertMany(results);
                        fs.unlinkSync(filePath); // delete temp file
                        res.status(200).json({ message: "Master uploaded successfully" });
                    } catch (err) {
                        console.error("DB insert error:", err);
                        res.status(500).json({ message: "Failed to save masterdata" });
                    }
                });
        } catch (err) {
            console.error("File read error:", err);
            res.status(500).json({ message: "Failed to process file" });
        }
    } catch (error) {
        res.status(500).send({
            status: false,
            message: "Error creating masterData",
            error: error.message,
        });
    }
};

module.exports = {
    uploadEmployee,
    uploadMasterData
};