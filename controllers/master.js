const ProductionDepartment = require("../models/prodDept");
const ProductionNature = require("../models/prodNature");
const ProductionShift = require("../models/prodShifts");

/***
 * Production Department API
 * */
const createProductionDept = async (req, res) => {
  try {
    const newDept = new ProductionDepartment(req.body);

    await newDept.save();

    res.status(201).send({
      status: true,
      message: "Production department created successfully",
      data: newDept,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error creating production department",
      error: error.message,
    });
  }
};

const getProductionDepts = async (req, res) => {
  try {
    let filter = {};
    const productionDepts = await ProductionDepartment.find(filter);
    res.status(200).send({
      status: true,
      data: productionDepts,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production departments",
      error: error.message,
    });
  }
};

const getProductionDeptById = async (req, res) => {
  try {
    const { id } = req.params;
    const dept = await ProductionDepartment.findById(id);

    if (!dept) {
      return res.status(404).send({
        status: false,
        message: "Production department not found",
      });
    }

    res.status(200).send({
      status: true,
      data: dept,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production department",
      error: error.message,
    });
  }
};

const updateProductionDept = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDept = await ProductionDepartment.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated department
    );

    if (!updatedDept) {
      return res.status(404).send({
        status: false,
        message: "Production department not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production department updated successfully",
      data: updatedDept,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error updating production department",
      error: error.message,
    });
  }
};

const deleteProductionDept = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDept = await ProductionDepartment.findByIdAndDelete(id);

    if (!deletedDept) {
      return res.status(404).send({
        status: false,
        message: "Production department not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production department deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error deleting production department",
      error: error.message,
    });
  }
};

/***
 * Production Nature API
 * */
const createProductionNature = async (req, res) => {
  try {
    const { productionCode } = req.body;
    const existingNature = await ProductionNature.findOne({ productionCode });
    if (existingNature) {
      return res.status(400).send({
        status: false,
        message: "Production nature with this name already exists",
      });
    }

    const newProductionNature = new ProductionNature(req.body);

    await newProductionNature.save();

    res.status(201).send({
      status: true,
      message: "Production nature created successfully",
      data: newProductionNature,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error creating production nature",
      error: error.message,
    });
  }
};
const getProductionNatures = async (req, res) => {
  try {
    let filter = {};
    const productionNatures = await ProductionNature.find(filter).populate(
      "building_id",
      "_id buildingName buildingCode"
    );
    console.log(productionNatures);
    res.status(200).send({
      status: true,
      data: productionNatures,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production natures",
      error: error.message,
    });
  }
};

const getProductionNatureById = async (req, res) => {
  try {
    const { id } = req.params;
    const productionNature = await ProductionNature.findById(id);

    if (!productionNature) {
      return res.status(404).send({
        status: false,
        message: "Production nature not found",
      });
    }

    res.status(200).send({
      status: true,
      data: productionNature,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production nature",
      error: error.message,
    });
  }
};

const updateProductionNature = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProductionNature = await ProductionNature.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updatedProductionNature) {
      return res.status(404).send({
        status: false,
        message: "Production nature not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production nature updated successfully",
      data: updatedProductionNature,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error updating production nature",
      error: error.message,
    });
  }
};

const deleteProductionNature = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProductionNature = await ProductionNature.findByIdAndDelete(
      id
    );

    if (!deletedProductionNature) {
      return res.status(404).send({
        status: false,
        message: "Production nature not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production nature deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error deleting production nature",
      error: error.message,
    });
  }
};

/***
 * Production Shifts API
 * */

const createProductionShift = async (req, res) => {
  try {
    const newShift = new ProductionShift(req.body);
    await newShift.save();
    res.status(201).send({
      status: true,
      message: "Production shift created successfully",
      data: newShift,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error creating production shift",
      error: error.message,
    });
  }
};
const getProductionShifts = async (req, res) => {
  try {
    const shifts = await ProductionShift.find();

    res.status(200).send({
      status: true,
      data: shifts,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production shifts",
      error: error.message,
    });
  }
};

const getProductionShiftById = async (req, res) => {
  try {
    const { id } = req.params;
    const shift = await ProductionShift.findById(id);

    if (!shift) {
      return res.status(404).send({
        status: false,
        message: "Production shift not found",
      });
    }

    res.status(200).send({
      status: true,
      data: shift,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production shift",
      error: error.message,
    });
  }
};

const updateProductionShift = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShift = await ProductionShift.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedShift) {
      return res.status(404).send({
        status: false,
        message: "Production shift not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production shift updated successfully",
      data: updatedShift,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error updating production shift",
      error: error.message,
    });
  }
};

const deleteProductionShift = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShift = await ProductionShift.findByIdAndDelete(id);

    if (!deletedShift) {
      return res.status(404).send({
        status: false,
        message: "Production shift not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production shift deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error deleting production shift",
      error: error.message,
    });
  }
};

const uploadMasterData = async (req, res) => {
   const results = [];
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'CSV file is required' });
    }
    const filePath = req.file.path;
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await ProductionShift.insertMany(results); // Bulk insert into MongoDB
          fs.unlinkSync(filePath); // Cleanup uploaded file
          res.status(200).json({
            status: true,
            message: 'Master data uploaded successfully',
            totalInserted: results.length,
          });
        } catch (insertError) {
          res.status(500).json({
            status: false,
            message: 'Error inserting master data',
            error: insertError.message,
          });
        }
      });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: 'Error processing upload',
      error: error.message,
    });
  }
};

module.exports = {
  createProductionDept,
  getProductionDepts,
  getProductionDeptById,
  updateProductionDept,
  deleteProductionDept,
  createProductionNature,
  getProductionNatures,
  getProductionNatureById,
  updateProductionNature,
  deleteProductionNature,
  createProductionShift,
  getProductionShifts,
  getProductionShiftById,
  updateProductionShift,
  deleteProductionShift,
  uploadMasterData
};
