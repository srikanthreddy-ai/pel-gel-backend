const TimeSheets = require("../models/timeSheets");

/***
 * get incentives by date API
 */
const getIncentivesByDate = async (req, res) => {
  try {
    res.status(200).send({
      status: true,
      data: mappedData,
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  getIncentivesByDate,
};
