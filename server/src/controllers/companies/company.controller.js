const Company = require("../../models/companies/company.model");
const bcrypt = require('bcrypt');

const CompanyController = {
  createCompany: async (req, res) => {
    try {
      const { name, email, password, industry, size, location, sustainabilityGoals } = req.body;

      const existingCompany = await Company.findOne({ email });
      if (existingCompany) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const newCompany = new Company({
        name,
        email,
        password,
        industry,
        size,
        location,
        sustainabilityGoals,
      });

      const savedCompany = await newCompany.save();
      res.status(201).json(savedCompany);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  loginCompany: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid request" });
    }
  
    try {
      const company = await Company.getCompanyByEmail(email);
      if (!company) {
        return res.status(400).json({ message: "Company not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, company.password);
      if (isPasswordValid) {
        const { password, ..._company } = company;
        console.log(company)

        return res.status(200).json({ company: _company });
      } else {
        return res.status(400).json({ message: "Invalid request" });
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { email } = req.body; 
      const company = await Company.getCompanyByEmail(email);
      if (!company) {
        return res.status(400).json({ message: "Company not found" });
      }
      res.json(company);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateProfile: async (req, res) => {
    try {
      const { industry, size, location, sustainabilityGoals } = req.body;
      const updatedCompany = await Company.findByIdAndUpdate(
        req.body.user_id,
        { industry, size, location, sustainabilityGoals },
        { new: true }
      ).select("-password");
      res.json(updatedCompany);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
};

module.exports = CompanyController;
