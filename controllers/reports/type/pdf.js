const PDFDocument = require("pdfkit");

const generatePDF = async (res, report, startDate, endDate, dataFrame = []) => {
  const doc = new PDFDocument({ margin: 40, size: 'A4' });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename="${report}.pdf"`);

  doc.pipe(res);

  // Title and date range
  doc.fontSize(18).text(`${report} Report`, { align: "center" });
  doc.moveDown(0.5);
  doc.fontSize(12).text(`Date Range: ${startDate} to ${endDate}`, { align: "center" });
  doc.moveDown(2);

  if (!dataFrame.length) {
    doc.fontSize(12).text("No data available for this report.", { align: "center" });
    doc.end();
    return;
  }

  // Manually draw table
  const headers = Object.keys(dataFrame[0]);
  const cellPadding = 5;
  const rowHeight = 20;
  const columnWidth = 100;

  // Draw table header
  doc.font("Helvetica-Bold").fontSize(10);
  headers.forEach((header, index) => {
    const x = 40 + (index * columnWidth);
    doc.text(header, x, doc.y);
  });
  doc.moveDown(1);

  // Draw table rows
  doc.font("Helvetica").fontSize(10);
  dataFrame.forEach((row) => {
    headers.forEach((header, index) => {
      const x = 40 + (index * columnWidth);
      doc.text(row[header]?.toString() || "", x, doc.y);
    });
    doc.moveDown(1);
  });

  doc.end();
};

module.exports = {
  generatePDF,
};
