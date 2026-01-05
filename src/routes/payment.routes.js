import express from 'express';
import pool from '../db.js';

const router = express.Router();




router.post('/salom', async (req, res) => {
  try {
    const { order_id, amount } = req.body;

    const result = await pool.query(
      `INSERT INTO payments(order_id, amount, pay_date)
       VALUES ($1, $2, NOW())
       RETURNING *`,
      [order_id, amount]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get('/Getpayment', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT p.id, o.id AS order_id, c.fullname, ca.name AS car, p.amount, p.pay_date
       FROM payments p
       JOIN orders o ON o.id = p.order_id
       JOIN customers c ON c.id = o.customer_id
       JOIN cars ca ON ca.id = o.car_id`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
