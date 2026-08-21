const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'Technology',
        'Healthcare',
        'Finance',
        'Education',
        'Engineering',
        'Creative',
        'Business',
        'Science',
        'Legal',
        'Trades',
      ],
    },
    requiredSkills: [
      {
        type: String,
        trim: true,
      },
    ],
    salaryRange: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    growthRate: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      default: 'Medium',
    },
    educationRequired: {
      type: String,
      default: '',
    },
    workEnvironment: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site', 'Flexible'],
      default: 'Flexible',
    },
    relatedCareers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
      },
    ],
    image: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Career', careerSchema);
