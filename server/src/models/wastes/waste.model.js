const mongoose = require('mongoose');

const wasteSchema = new mongoose.Schema({
  companyEmail: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: { 
    type: Date,
    required: false
  }
}, { timestamps: true });

const Waste = mongoose.model('Waste', wasteSchema);

module.exports = {
  Waste,
  createWaste: async (wasteData) => {
    const waste = new Waste(wasteData);
    return await waste.save();
  },
  getWastesByCompanyEmail: async (companyEmail) => {
    return Waste.find({ companyEmail }).sort({ createdAt: -1 }).lean();
  }
};
