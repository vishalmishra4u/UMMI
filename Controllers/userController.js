const User = require('../Models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const roles = require('../roles');
const { handleError } = require('../Services/errorService');

async function registerUser(req, res) {
  try {
    const { email, password, role } = req.body;

    // Check if the provided role is valid
    if (!Object.values(roles).includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Create a new user
    const newUser = new User({
      email,
      password,
      role,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    return handleError(error, 'Internal Server Error');
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // Check if the user exists
    if (!user) {
      return handleError(error, 400, 'Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return handleError(error, 401, 'Invalid email or password');
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'secret-key',
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    return handleError(error, 500, 'Internal Server Error');
  }
}

module.exports = { registerUser, loginUser };
