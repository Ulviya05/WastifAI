const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false, 
  },
  industry: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    enum: ['small', 'medium', 'large'],
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  sustainabilityGoals: {
    type: String,
    required: true,
  },
}, { timestamps: true });

companySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

companySchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Company = mongoose.model('Company', companySchema);

const createCompany = async (name, email, password, industry, size, location, sustainabilityGoals) => {
  const company = new Company({
    name,
    email,
    password,
    industry,
    size,
    location,
    sustainabilityGoals,
  });
  return await company.save();
};

const getCompanyByEmail = async (email) => {
  return Company.findOne({ email }).select('+password').lean();
};


const getCompanyProfile = async (id) => {
  return Company.findById(id).select('-password').lean();
};


const updateCompany = async (user_id, industry, size, location, sustainabilityGoals) => {
  const updatedCompany = await Company.findByIdAndUpdate(
    user_id,
    { industry, size, location, sustainabilityGoals },
    { new: true }
  ).select('-password');
  return updatedCompany;
};

module.exports = {
  Company,
  createCompany,
  getCompanyByEmail,
  getCompanyProfile,
  updateCompany,
};

