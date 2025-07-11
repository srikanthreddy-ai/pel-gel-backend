const {
  dayWisePayReport,
  monthWisePayReport,
} = require("./reports/payroleReports");
const { generateExcel } = require("./reports/type/excel");
const { generatePDF } = require("./reports/type/pdf");
const { generateHTML } = require("./reports/type/html");

/***
 * get report based on the type
 */
const getReport = async (req, res) => {
  try {
    const { report, type, startDate, endDate, period, building } = req.query;
    let dataFrame = null;

    // Validate input parameters
    if (!report || !type || !startDate || !endDate) {
      return res.status(400).send("Missing required parameters.");
    }

    // Check if the date range is valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    const timeDiff = end.getTime() - start.getTime();
    const dayDiff = timeDiff / (1000 * 3600 * 24);
    if (dayDiff > 31) {
      return res.status(400).send("Date range should not exceed 31 days.");
    }
    if (period == "daily") {
      dataFrame = await dayWisePayReport(startDate, endDate, building);
    }
    if (period == "monthly") {
      dataFrame = await monthWisePayReport(startDate, endDate, building);
    }
    if (type == "pdf") {
      generatePDF(res, report, startDate, endDate, dataFrame);
    } else if (type == "csv") {
      await generateExcel(res, report, startDate, endDate, dataFrame);
    } else if (type == "excel") {
      await generateExcel(res, report, startDate, endDate, dataFrame);
    } else if (type == "html") {
      generateHTML(res, report, startDate, endDate, dataFrame);
    } else {
      return res.status(400).send("Invalid report type.");
    }
    // res.status(200).send({
    //   status: true,
    //   data: mappedData,
    // });
  } catch (error) {
    res.status(500).send({
      status: false,
      error: error.message,
    });
  }
};

module.exports = {
  getReport,
};
