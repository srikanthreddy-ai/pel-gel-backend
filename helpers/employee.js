const employeeSchema = (row) => {
    try {
        return {
            title: row.title,
            firstName: row.firstName,
            lastName: row.lastName,
            email: row.email,
            designation: row.designation,
            department: row.department,
            role: row.role,
            cader: row.cader,
            empCode: row.empCode,
            pfNo: row.pfNo,
            basic: Number(row.basic) || 0,
            fda: Number(row.fda) || 0,
            newVda: Number(row.newVda) || 0,
            splPay: Number(row.splPay) || 0,
            hra: Number(row.hra) || 0,
            ca: Number(row.ca) || 0,
            hra: Number(row.hra) || 0,
            seniorityAllow: Number(row.seniorityAllow) || 0,
            uanNumber: row.uanNumber,
            dateOfBirth: row.dateOfBirth,
            joiningDate: row.joiningDate,
            lastDate: row.lastDate,
            dateOfProbation: row.dateOfProbation,
            bankDetails: {
                bankName: row.bankName,
                accountNumber: row.accountNumber,
                ifscCode: row.ifscCode,
                branchName: row.branchName,
                accountHolderName: row.accountHolderName,
            },
        };

    } catch (error) {
        console.error("File read error:", error);
        res.status(500).json({ message: "Failed to process file" });
    }
};


const masterDataSchema = (row) => {
    try {

        return {
            buildingId: row.buildingId,
            buildingName: row.buildingName,
            buildingCode: row.buildingCode,
            description: row.description,
            startDate: row.startDate,
            endDate: row.endDate,
        };

    } catch (error) {
        console.error("File read error:", error);
        res.status(500).json({ message: "Failed to process file" });
    }
};
module.exports = {
    employeeSchema,
    masterDataSchema
};