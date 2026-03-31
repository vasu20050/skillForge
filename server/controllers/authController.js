const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'skillforge_secret_2026', { expiresIn: '30d' });
};

// Guest Login — creates / reuses a shared read-only demo account
exports.guestLogin = async (req, res) => {
  try {
    const GUEST_EMAIL = 'guest@skillforge.demo';
    let guest = await User.findOne({ email: GUEST_EMAIL });

    if (!guest) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('guestpass_2026', salt);
      guest = await User.create({
        name: 'Guest User',
        email: GUEST_EMAIL,
        password: hashedPassword,
        roles: ['student'],
        mode_status: 'learner',
        credits_wallet: { available: 250, escrow_locked: 0, lifetime_earned: 0, lifetime_spent: 0 }
      });
    }

    res.json({
      _id: guest._id,
      name: guest.name,
      email: guest.email,
      roles: guest.roles,
      mode_status: guest.mode_status,
      credits_wallet: guest.credits_wallet,
      profile: guest.profile,
      isGuest: true,
      token: generateToken(guest._id)
    });
  } catch (error) {
    console.error('Guest Login Error:', error);
    res.status(500).json({ message: 'Could not create guest session.' });
  }
};

// Register
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields (name, email, password).' });
    }

    // College Email Validation: Must have a known educational suffix or contains "edu", "ac", or campus domain
    const collegeSuffixes = ['.edu', '.ac.in', '.ac.uk', '.edu.ng', '.edu.eg', '.camp', '.in'];
    const lowerEmail = email.toLowerCase();
    const isValidCollegeEmail = collegeSuffixes.some(suffix => lowerEmail.endsWith(suffix)) || 
                                (lowerEmail.includes('.edu') || lowerEmail.includes('.ac.') || lowerEmail.includes('delhitechnicalcamp'));
    
    if (!isValidCollegeEmail) {
      return res.status(400).json({ 
        message: 'Registration restricted to verified college email domains.',
        details: 'Supported: .edu, .ac.in, .camp, etc.'
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Account already registered with this email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Initial user setup
    const userRole = role && ['student', 'client'].includes(role) ? role : 'student';
    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      roles: [userRole],
      mode_status: userRole === 'student' ? 'learner' : 'verified_earner', // Clients are verified by default in this context
      credits_wallet: {
        available: userRole === 'client' ? 1000 : 0, // Clients start with credits for testing
        escrow_locked: 0,
        lifetime_earned: 0,
        lifetime_spent: 0
      }
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        mode_status: user.mode_status,
        credits: user.credits_wallet,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: 'Internal Server Error during registration.' });
  }
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        roles: user.roles,
        mode_status: user.mode_status,
        credits_wallet: user.credits_wallet,
        profile: user.profile,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials.' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal Server Error during login.' });
  }
};

// Get Me (Profile)
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (error) {
    console.error('Fetch Me Error:', error);
    res.status(500).json({ message: 'Server error fetching user profile.' });
  }
};

// Update Profile
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      
      // Ensure profile sub-document exists
      if (!user.profile) {
        user.profile = {};
      }
      
      if (req.body.headline) user.profile.headline = req.body.headline;
      if (req.body.photoUrl) user.profile.photoUrl = req.body.photoUrl;

      // Handle department/year updates if present in body
      if (req.body.department) user.profile.department = req.body.department;
      if (req.body.year) user.profile.year = req.body.year;

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        roles: updatedUser.roles,
        mode_status: updatedUser.mode_status,
        credits_wallet: updatedUser.credits_wallet,
        profile: updatedUser.profile
      });
    } else {
      res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Update Profile Error:', error);
    res.status(500).json({ message: 'Server error updating profile.' });
  }
};
