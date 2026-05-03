
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

// In-memory user store
const users = [
  {
    _id: 'mock-user-1',
    email: 'sharadgupta6393@gmail.com',
    username: 'Sharad',
    passwordHash: '', // Will be set below
    plan: 'PREMIUM',
    planSelectedAt: new Date(),
    codeshareCount: 5,
  }
];

// Initialize mock user password
bcrypt.hash('password123', 12).then(hash => {
  users[0].passwordHash = hash;
});

const MockUser = {
  findOne: async (query) => {
    const email = query.email.toLowerCase();
    return users.find(u => u.email === email) || null;
  },
  findById: async (id) => {
    return users.find(u => u._id === id) || null;
  },
  create: async (data) => {
    const newUser = {
      _id: nanoid(),
      ...data,
      codeshareCount: 0,
      save: async function() { return this; }
    };
    users.push(newUser);
    return newUser;
  },
  findByIdAndUpdate: async (id, update, options) => {
    const index = users.findIndex(u => u._id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...update };
    return users[index];
  }
};

module.exports = MockUser;
