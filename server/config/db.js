const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || 'mongodb://localhost/skillforge';
    console.log('connecting to MongoDB with URI:', uri);
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.warn('⚠️  Database connection failed. Ensure MongoDB is running or provide a MONGO_URI.');
    console.error(err.message);
    // Don't exit for now, so the server can still run other health endpoints or dummy logic
  }
};

module.exports = connectDB;
