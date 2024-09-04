
const users = [
  { id: 1, username: 'user1', password: 'password', role: 'user' },
  { id: 2, username: 'admin', password: 'admin', role: 'admin' }
];

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersecretkey';

const getUsers = (req, res) => {
  res.json(users);
};

const createUser = (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = { id: users.length + 1, username, password: hashedPassword, role: 'user' };
  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  const user = users.find(u => u.id === parseInt(id));

  if (user) {
    user.username = username || user.username;
    user.password = password ? bcrypt.hashSync(password, 10) : user.password;
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
