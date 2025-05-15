const ExcelJS = require("exceljs");

const generateExcel = async (res, report, startDate, endDate, dataFrames = []) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(`${report} Report`);

    if (!dataFrames.length) {
      worksheet.addRow(["No data available"]);
    } else {
      // Dynamically create columns from keys of the first object
      const firstRow = dataFrames[0];
      const keys = Object.keys(firstRow);

      worksheet.columns = keys.map((key) => ({
        header: toTitleCase(key),
        key,
        width: 20,
      }));

      // Add data rows
      dataFrames.forEach((row) => {
        worksheet.addRow(row);
      });
    }

    // Set headers for file response
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", `attachment; filename="${report}.xlsx"`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel report:", error);
    res.status(500).send("Error generating Excel report.");
  }
};

// Helper to format keys as titles
function toTitleCase(str) {
  return str
    .replace(/([A-Z])/g, " $1") // space before capital letters
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter
}

module.exports = {
  generateExcel,
};
