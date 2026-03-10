const mongoose = require('mongoose');
const User = require('./models/User');
const Project = require('./models/Project');
const bcrypt = require('bcrypt');

require('dotenv').config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/skillforge');
    console.log('Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});

    console.log('Creating mock users...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    const client = await User.create({
      name: 'Vaidyanathan Raghavan',
      email: 'vaidy@college.edu',
      password: hashedPassword,
      role: 'client',
      credits: 500
    });

    const worker = await User.create({
      name: 'Vaibhav Sharma',
      email: 'vaibhav@college.ac.in',
      password: hashedPassword,
      role: 'worker',
      credits: 100
    });

    console.log('Creating mock project...');
    await Project.create({
      title: 'Design a Modern Landing Page',
      description: 'I need a premium landing page with glassmorphism for my campus hackathon project. Must use Tailwind.',
      category: 'Web Development',
      rewardParams: { credits: 50 },
      client: client._id,
      status: 'open'
    });

    console.log('Database Seeded! 🚀');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seedData();
