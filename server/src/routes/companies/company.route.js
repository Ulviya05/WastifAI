const express = require('express');
const CompanyController = require('../../controllers/companies/company.controller');

const router = express.Router();

router.post('/', CompanyController.createCompany);
router.post('/login', CompanyController.loginCompany);
router.get('/:email', CompanyController.getProfile);

module.exports = router;