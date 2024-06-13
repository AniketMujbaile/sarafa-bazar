const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  email: {
    type: String
  },
  address: {
    type: String
  },
  phone: {
    type: String
  }
});

CompanySchema.index({ name: 'text', description: 'text', email: 'text', address: 'text', phone: 'text' });

module.exports = mongoose.model('Company', CompanySchema);
