const generateHTML = async (res, report, startDate, endDate, dataFrame = []) => {
  // Extract table headers from the first object in dataFrame
  const headers = dataFrame.length > 0 ? Object.keys(dataFrame[0]) : [];

  const generateTableRows = () => {
    if (!dataFrame.length) {
      return `<tr><td colspan="${headers.length || 1}">No data available for this range.</td></tr>`;
    }

    return dataFrame.map((row) => {
      const cells = headers.map((key) => `<td>${row[key] ?? ""}</td>`).join("");
      return `<tr>${cells}</tr>`;
    }).join("\n");
  };

  const generateTableHeader = () => {
    if (!headers.length) return `<th>Message</th>`;
    return headers.map(header => `<th>${header}</th>`).join("");
  };

  const htmlContent = `
  <html>
    <head>
      <title>${report} Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 40px;
          background-color: #f9f9f9;
          color: #333;
        }

        h1 {
          text-align: center;
          color: #2c3e50;
          margin-bottom: 20px;
        }

        p {
          text-align: center;
          font-size: 16px;
          margin-bottom: 30px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background-color: #fff;
        }

        th, td {
          padding: 12px 16px;
          text-align: left;
          border: 1px solid #ddd;
        }

        th {
          background-color: #2c3e50;
          color: white;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        tr:hover {
          background-color: #e6f7ff;
        }
      </style>
    </head>
    <body>
      <h1>${report} Report</h1>
      <p>Date Range: ${startDate} to ${endDate}</p>
      <table>
        <thead>
          <tr>${generateTableHeader()}</tr>
        </thead>
        <tbody>
          ${generateTableRows()}
        </tbody>
      </table>
    </body>
  </html>
  `;

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Disposition", 'attachment; filename="report.html"');
  res.send(htmlContent);
};

module.exports = {
  generateHTML,
};
