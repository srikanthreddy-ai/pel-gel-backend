const ProductionDepartment = require("../models/prodDept");
const ProductionNature = require("../models/prodNature");

/***
 * Get production nature grouped by building
 */
const getNatureByCategory = async (req, res) => {
  try {
    // Fetch all production natures
    let filter = {
      isDeleted: false,
    };
    const natureList = await ProductionNature.find(filter).populate('building_id', '_id buildingName buildingCode');
    // console.log("natureList", natureList);

    if (!natureList.length) {
      return res.status(404).send({
        status: false,
        message: "No production natures found",
        data: [],
      });
    }

    // Fetch all building details (to get name by ID)
    const buildingIds = [
      ...new Set(natureList.map((item) => item.building_id)),
    ];
    const buildings = await ProductionDepartment.find({
      _id: { $in: buildingIds },
    });

    const mappedData = natureList.reduce((result, item) => {
      // Check if the building_id exists
      const building = item.building_id ? item.building_id.buildingName : "Unknown Building";
    
      // Find the building object in the result array, or create it if not found
      let buildingData = result.find(b => b.name === building);
    
      if (!buildingData) {
        buildingData = {
          id: item.building_id._id, // Assign a unique building ID, you can customize this as per your needs
          name: building,
          code: item.building_id.buildingCod,
          productionNatures: []
        };
        result.push(buildingData);
      }
    
      // Push the production nature into the correct building's productionNatures array
      buildingData.productionNatures.push({
        id: item._id, // Assign a unique production nature ID
        name: item.productionNature,
        productionType: item.productionType,
        productionCode: item.productionCode,
        manpower: item.manpower,
        norms: item.norms,
        incentives: item.incentives,
        startDate: item.startDate,
        endDate: item.endDate,
      });
    
      return result;
    }, []);

    res.status(200).send({
      status: true,
      message: "Nature list grouped by building",
      data: mappedData,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: "Error getting nature list",
      error: error.message,
    });
  }
};

module.exports = {
  getNatureByCategory,
};
