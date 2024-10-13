const express = require("express");
const api = express.Router();

const companiesRouter = require("./companies/company.route");
const wastesRouter = require("./wastes/waste.route");
const dashboardRouter = require("./dashboard/dashboard.route");

api.use("/companies", companiesRouter);
api.use("/wastes", wastesRouter);
api.use("/dashboard", dashboardRouter);

module.exports = api;