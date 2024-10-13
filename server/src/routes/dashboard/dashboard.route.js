const express = require('express');
const router = express.Router();
const dashboardController = require('../../controllers/dashboard/dashboard.controller');

router.get('/', dashboardController.getDashboardData);
router.get('/available-materials', dashboardController.getAvailableMaterials);

module.exports = router;