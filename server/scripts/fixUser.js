const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const fix = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillforge';
        await mongoose.connect(uri);
        
        const email = 'vaibhav2_cseaml25@delhitechnicalcamp';
        let user = await User.findOne({ email });
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        if (!user) {
            console.log('Creating user...');
            user = await User.create({
                name: 'Vaibhav',
                email: email,
                password: hashedPassword,
                roles: ['student'],
                mode_status: 'learner',
                credits_wallet: { available: 500, escrow_locked: 0, lifetime_earned: 0, lifetime_spent: 0 }
            });
            console.log('✅ User created successfully with password: password123');
        } else {
            console.log('User found, resetting password...');
            user.password = hashedPassword;
            await user.save();
            console.log('✅ Password reset to: password123');
        }
        process.exit();
    } catch (err) {
        console.error('Error during fix:', err);
        process.exit(1);
    }
};

fix();
