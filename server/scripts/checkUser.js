const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const check = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillforge';
        await mongoose.connect(uri);
        const user = await User.findOne({ email: 'vaibhav2_cseaml25@delhitechnicalcamp' });
        if (user) {
            console.log('User found:', user.email);
        } else {
            console.log('User NOT found');
        }
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

check();
