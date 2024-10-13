const Waste = require('../../models/wastes/waste.model');
const Company = require('../../models/companies/company.model');

const WasteController = {
  addWaste: async (req, res) => {
    try {
      const { companyEmail, type, quantity, unit, description, date } = req.body; // Added date
      const company = await Company.getCompanyByEmail(companyEmail);
      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }
      const newWaste = await Waste.createWaste({
        companyEmail,
        type,
        quantity,
        unit,
        description,
        date 
      });
      res.status(201).json(newWaste);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  getWastes: async (req, res) => {
    try {
      const { email } = req.params;
      const wastes = await Waste.getWastesByCompanyEmail(email);
      res.json(wastes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = WasteController;
