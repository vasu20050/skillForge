const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillforge';
    console.log('Connecting to MongoDB at:', uri);
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
