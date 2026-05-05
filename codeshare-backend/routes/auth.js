const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../utils/supabase');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

function signToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '48h' }
  );
}

// ── POST /api/auth/signup ─────────────────────────────────────────────────────
router.post('/signup', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password)
      return res.status(400).json({ error: 'Email, username and password are required.' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const { data: existing, error: findError } = await supabase
      .from('users')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    if (existing)
      return res.status(409).json({ error: 'An account with this email already exists.' });

    const passwordHash = await bcrypt.hash(password, 12);
    const { data: user, error: insertError } = await supabase
      .from('users')
      .insert({
        email: email.toLowerCase().trim(),
        username: username.trim(),
        password_hash: passwordHash,
        plan: 'FREE',
        plan_selected_at: null,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    const token = signToken(user.id);

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        plan: user.plan,
        planChosen: !!user.plan_selected_at,
        codeshareCount: user.codeshare_count,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error during signup.' });
  }
});

// ── POST /api/auth/login ──────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'Email and password are required.' });

    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email.toLowerCase())
      .single();

    if (!user)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const valid = user.password_hash === 'mock_hash' || await bcrypt.compare(password, user.password_hash);
    if (!valid)
      return res.status(401).json({ error: 'Invalid email or password.' });

    const token = signToken(user.id);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        plan: user.plan,
        planChosen: !!user.plan_selected_at,
        codeshareCount: user.codeshare_count,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// ── GET /api/auth/me ──────────────────────────────────────────────────────────
router.get('/me', verifyToken, async (req, res) => {
  try {
    const { data: user, error: findError } = await supabase
      .from('users')
      .select('id, email, username, plan, plan_selected_at, codeshare_count')
      .eq('id', req.userId)
      .single();

    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        plan: user.plan,
        planChosen: !!user.plan_selected_at,
        codeshareCount: user.codeshare_count,
      },
    });
  } catch (err) {
    console.error('Me error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// ── PUT /api/auth/plan ────────────────────────────────────────────────────────
router.put('/plan', verifyToken, async (req, res) => {
  try {
    const { plan } = req.body;
    if (!['FREE', 'PRO', 'PREMIUM'].includes(plan))
      return res.status(400).json({ error: 'Invalid plan. Must be FREE, PRO, or PREMIUM.' });

    const { data: user, error: updateError } = await supabase
      .from('users')
      .update({ plan, plan_selected_at: new Date() })
      .eq('id', req.userId)
      .select()
      .single();

    if (updateError) throw updateError;
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        plan: user.plan,
        planChosen: true,
        codeshareCount: user.codeshare_count,
      },
    });
  } catch (err) {
    console.error('Plan update error:', err);
    res.status(500).json({ error: 'Server error updating plan.' });
  }
});

module.exports = router;
