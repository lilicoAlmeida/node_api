
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors());

// Basic rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per window
});
app.use(limiter);

// Sample user data (for demonstration, this will be dynamic in a real app)
const users = [
  { id: 1, username: 'user1', password: '$2a$10$eW5K1Xmj5l6Jjc1qXbEd7eXxMopONuKZIWq7OT5.ZZJWvJxiTbnYq', role: 'user' }, // password: 'password'
  { id: 2, username: 'admin', password: '$2a$10$aIpSp9OBvUM2i0fRJ8FwtOZc2GxJixrQczH6PI7A.5UOLsqOrXVQu', role: 'admin' } // password: 'admin'
];

// JWT secret key
const JWT_SECRET = 'supersecretkey';

// Route to authenticate user and provide JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Token required' });
  }

  jwt.verify(token.split(' ')[1], JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};

// Route protected by token authentication
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
