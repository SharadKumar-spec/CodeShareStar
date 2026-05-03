require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function seed() {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/codeshare';
  try {
    await mongoose.connect(uri);
    console.log('Connected to MongoDB for seeding...');

    const email = 'sharadgupta6393@gmail.com';
    const existing = await User.findOne({ email });
    
    if (existing) {
      console.log('User already exists. Updating password...');
      const hash = await bcrypt.hash('password123', 12);
      existing.passwordHash = hash;
      existing.plan = 'PREMIUM';
      await existing.save();
    } else {
      console.log('Creating new seed user...');
      const hash = await bcrypt.hash('password123', 12);
      await User.create({
        email: email,
        username: 'Sharad',
        passwordHash: hash,
        plan: 'PREMIUM',
        planSelectedAt: new Date(),
        codeshareCount: 5
      });
    }
    console.log('✅ Seed successful: sharadgupta6393@gmail.com / password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
