const { Company } = require('../../models/companies/company.model');
const { Waste } = require('../../models/wastes/waste.model');
const natural = require('natural');
const { TfIdf } = natural;

const DashboardController = {
  getDashboardData: async (req, res) => {
    try {
      const { email } = req.query;
      const company = await Company.findOne({ email });

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const allWastes = await Waste.find().lean();

      const companyWastes = allWastes.filter(waste => waste.companyEmail !== email);

      const tfidf = new TfIdf();
      tfidf.addDocument(`${company.industry} ${company.size} ${company.location} ${company.sustainabilityGoals}`);

      companyWastes.forEach((waste) => {
        tfidf.addDocument(`${waste.type} ${waste.description}`);
      });

      const similarities = companyWastes.map((waste, index) => {
        const similarity = tfidf.tfidf(tfidf.listTerms(0)[0].term, index + 1);
        return { waste, similarity };
      });

      similarities.sort((a, b) => b.similarity - a.similarity);

      const recommendedWastes = similarities.slice(0, 5).map(item => item.waste);

      res.json({
        companyName: company.name,
        recommendedWastes,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAvailableMaterials: async (req, res) => {
    try {
      const { email } = req.query;
      const company = await Company.findOne({ email });

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }

      const allWastes = await Waste.find().lean();
      
      const availableMaterials = allWastes.filter(waste => waste.companyEmail !== email);

      res.json({
        availableMaterials,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = DashboardController;
