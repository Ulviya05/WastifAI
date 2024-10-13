const express = require('express');
const WasteController = require('../../controllers/wastes/waste.controller');

const router = express.Router();

router.post('/', WasteController.addWaste);
router.get('/:email', WasteController.getWastes);

module.exports = router;
