const mongoose = require('mongoose');
const Project = require('../models/Project');
require('dotenv').config();

const dummyProjects = [
  {
    title: 'Landing Page for Robotics Club',
    description: 'Create a responsive landing page for the annual campus robotics fest. Must include an event schedule and registration form.',
    category: 'Web Development',
    credits_total: 100,
    status: 'Open',
    project_type: 'learn_dummy',
    proof_requirements: ['GitHub URL', 'Live Preview Link'],
    milestones: [
        { title: 'UI Design', description: 'Figma or static HTML mockup', percentage_split: 40, amount_credits: 40 },
        { title: 'Responsive Implementation', description: 'Functional React/HTML code', percentage_split: 60, amount_credits: 60 }
    ]
  },
  {
    title: 'Campus Sustainability Poster',
    description: 'Design a high-impact poster to promote plastic-free week on campus. Target audience is students and faculty.',
    category: 'Graphic Design',
    credits_total: 50,
    status: 'Open',
    project_type: 'learn_dummy',
    proof_requirements: ['High-res Export', 'Source File (PSD/AI)'],
    milestones: [
        { title: 'Initial Draft', description: 'Concept and layout', percentage_split: 50, amount_credits: 25 },
        { title: 'Final Handover', description: 'Print-ready files', percentage_split: 50, amount_credits: 25 }
    ]
  },
  {
      title: 'ML Dataset Tagging (Images)',
      description: 'Tag 500 images of campus infrastructure for an internal AI navigation project. Accuracy must be above 95%.',
      category: 'AI Data Tasks',
      credits_total: 80,
      status: 'Open',
      project_type: 'learn_dummy',
      proof_requirements: ['JSON/CSV Export'],
      milestones: [
          { title: 'Initial 100 Tags', description: 'Quality check sample', percentage_split: 20, amount_credits: 16 },
          { title: 'Final Dataset', description: 'Complete tagged images', percentage_split: 80, amount_credits: 64 }
      ]
  }
];

const seed = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillforge';
        await mongoose.connect(uri);
        console.log('Connected for seeding...');

        // Clear existing dummies
        await Project.deleteMany({ project_type: 'learn_dummy' });
        
        await Project.insertMany(dummyProjects);
        console.log('✅ 3 High-Quality Learn Projects Seeded.');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seed();
