const ProductionAllowence = require("../models/prodAllowences");

/***
 * Production Allowences API
 * */

const createProductionAllowence = async (req, res) => {
  try {
    const newAllowence = new ProductionAllowence(req.body);
    await newAllowence.save();
    res.status(201).send({
      status: true,
      message: "Production allowence created successfully",
      data: newAllowence,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error creating production allowence",
      error: error.message,
    });
  }
};
const getProductionAllowence = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const skip = (page - 1) * limit;
    let filter = { };
    if(req.query.allowence) {
      filter.allowence = req.query.allowence;
    }
    // Total count of documents
    const totalItems = await ProductionAllowence.countDocuments();

    // Paginated data
    const allowence = await ProductionAllowence.find(filter)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalItems / limit);

    res.status(200).send({
      status: true,
      currentPage: page,
      totalItems,
      totalPages,
      data: allowence,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production allowence",
      error: error.message,
    });
  }
};


const getProductionAllowenceById = async (req, res) => {
  try {
    const { id } = req.params;
    const allowence = await ProductionAllowence.findById(id);

    if (!allowence) {
      return res.status(404).send({
        status: false,
        message: "Production allowence not found",
      });
    }

    res.status(200).send({
      status: true,
      data: allowence,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error retrieving production allowence",
      error: error.message,
    });
  }
};

const updateProductionAllowence = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAllowence = await ProductionAllowence.findByIdAndUpdate(
      id,
      req.body,
      { new: true } // Return the updated document
    );

    if (!updatedAllowence) {
      return res.status(404).send({
        status: false,
        message: "Production allowence not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "Production allowence updated successfully",
      data: updatedAllowence,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error updating production shift",
      error: error.message,
    });
  }
};



module.exports = {
  createProductionAllowence,
  getProductionAllowence,
  getProductionAllowenceById,
  updateProductionAllowence,
};
