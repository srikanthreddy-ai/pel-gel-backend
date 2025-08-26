const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const employeeRouter = require("./routes/employee");
const masterRouter = require("./routes/master");
const prodMasterRouter = require("./routes/prodMaster");
const timeSheetRouter = require("./routes/timesheet");
const prodAllowenceRouter = require("./routes/prodAllowences");
const log = require("./handlers/logger");
const reportsMaster = require("./routes/reports");
const bulkUpload = require("./routes/masterData");

// Swagger setup
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Load env variables (optional - if using .env files)
require("dotenv").config();

const app = express();

// ──────────────────────── Swagger Config ──────────────────────── //
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PEL backend API",
      version: "1.0.0",
      description: "API for managing production shifts, departments, and more",
    },
    servers: [
      {
        url: "http://localhost:5000/v1/api",
      },
      {
        url: "https://pel-gel-backend.onrender.com/v1/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ──────────────────────── View Engine Setup ──────────────────────── //
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// Allow requests from your frontend
app.use(cors({
  origin: "*",                      // or "*" to allow all origins
  credentials: true,               // if using cookies or auth headers
}));

// Or allow all (dev-only)
app.use(cors());
// ──────────────────────── Middleware ──────────────────────── //
app.use(logger("dev")); // Morgan for HTTP logging
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Custom Request Logger
app.use((req, res, next) => {
  log.info(`${req.method} ${req.originalUrl}`);
  next();
});
// ──────────────────────── Swagger UI ──────────────────────── //
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    docExpansion: "none", // Options: "none", "list", "full"
  })
);

// ──────────────────────── Routes ──────────────────────── //
// app.use("/", indexRouter);
app.use("/v1/api", usersRouter);
app.use("/v1/api", employeeRouter);
app.use("/v1/api", masterRouter);
app.use("/v1/api", prodMasterRouter);
app.use("/v1/api", timeSheetRouter);
app.use("/v1/api", prodAllowenceRouter);
app.use("/v1/api", reportsMaster);
app.use("/v1/api", bulkUpload);

// ──────────────────────── MongoDB Connection ──────────────────────── //
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  log.error("❌ MongoDB URI not provided in environment variables");
  process.exit(1);
}
// Connect to MongoDB
// mongoose.set("strictQuery", false); // Optional: Set strict query mode

mongoose
  .connect(mongoURI)
  .then(() => log.info("✅ MongoDB connected"))
  .catch((err) => log.error("❌ MongoDB connection failed:", err));


app.use(express.static(path.join(__dirname, "./dist")));
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "./dist", "index.html"));
});

// ──────────────────────── Error Handling ──────────────────────── //

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Log the error
  log.error(`❌ ${status} - ${err.message}`);

  // Respond with JSON if API route
  if (req.originalUrl.startsWith("/v1")) {
    return res.status(status).json({
      error: {
        message: err.message,
        ...(req.app.get("env") === "development" && { stack: err.stack }),
      },
    });
  }

  // Otherwise, render error view
  res.status(status);
  res.render("error");
});

module.exports = app;
