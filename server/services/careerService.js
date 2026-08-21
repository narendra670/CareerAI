const Career = require('../models/Career');

const getCareerById = async (id) => {
  return Career.findById(id).populate('relatedCareers');
};

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const searchCareers = async (query) => {
  const safeQuery = escapeRegex(String(query));
  return Career.find({
    $or: [
      { title: { $regex: safeQuery, $options: 'i' } },
      { category: { $regex: safeQuery, $options: 'i' } },
      { description: { $regex: safeQuery, $options: 'i' } },
    ],
  });
};

module.exports = { getCareerById, searchCareers };
