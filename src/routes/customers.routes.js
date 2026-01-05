import express from 'express';
import pool from '../db.js';

const router = express.Router();

router.post('/customerss', async (req, res) => {
  const { fullname, phone } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO customers(fullname, phone) VALUES ($1, $2) RETURNING *',
      [fullname, phone]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

router.get('/getcustomers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
