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
    const allowence = await ProductionAllowence.find();

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
