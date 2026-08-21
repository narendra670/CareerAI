const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('savedCareers');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updates = {};
    const allowed = ['name', 'bio', 'skills', 'interests', 'education', 'experience', 'avatar', 'assessmentResults'];

    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedUser = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const mongoose = require('mongoose');

const saveCareer = async (req, res) => {
  try {
    const { careerId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(careerId)) {
      return res.status(400).json({ message: 'Invalid career ID' });
    }

    const user = await User.findById(req.user._id);
    const isSaved = user.savedCareers.some(
      (id) => id.toString() === careerId
    );

    if (isSaved) {
      user.savedCareers = user.savedCareers.filter(
        (id) => id.toString() !== careerId
      );
    } else {
      user.savedCareers.push(careerId);
    }

    await user.save();
    res.json({ savedCareers: user.savedCareers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProfile, updateProfile, saveCareer };
