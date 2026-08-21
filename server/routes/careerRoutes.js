const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { getCareerById, searchCareers } = require('../services/careerService');

router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ message: 'Search query is required' });
    }
    const careers = await searchCareers(q);
    res.json(careers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }
    const career = await getCareerById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.json(career);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
