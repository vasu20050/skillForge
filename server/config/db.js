const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost/skillforge';
    console.log('Connecting to MongoDB...');
    mongoose.set('debug', true); // Watch MongoDB commands
    await mongoose.connect(uri);
    console.log('✅ MongoDB connected');
  } catch (err) {
    console.warn('⚠️  Database connection failed. Ensure MongoDB is running or provide a MONGO_URI.');
    console.error('Connection Error:', err.message);
  }
};

mongoose.connection.on('error', err => {
  console.error('Mongoose Default Connection Error:', err);
});

module.exports = connectDB;
