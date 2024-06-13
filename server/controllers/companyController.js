const Company = require('../models/Company');
const xlsx = require('node-xlsx');
const fs = require('fs');

exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const company = await newCompany.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateCompany = async (req, res) => {
  try {
    let company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    company = await Company.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ msg: 'Company not found' });
    }
    await company.remove();
    res.json({ msg: 'Company removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.searchCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ $text: { $search: req.query.q } });
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.bulkAddCompanies = async (req, res) => {
  try {
    const file = req.file;
    const data = xlsx.parse(fs.readFileSync(file.path));
    const companies = data[0].data;
    companies.shift(); // remove header row
    const companyObjects = companies.map(company => ({
      name: company[0],
      description: company[1],
      email: company[2],
      address: company[3],
      phone: company[4]
    }));
    await Company.insertMany(companyObjects);
    res.json({ msg: 'Companies added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
