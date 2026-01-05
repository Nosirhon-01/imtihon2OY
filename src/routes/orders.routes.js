import express from 'express';
import pool from '../db.js';

const router = express.Router();


router.post('/', async (req, res) => {
  try {
    const { customer_id, car_id, months } = req.body;

    const result = await pool.query(
      `INSERT INTO orders(customer_id, car_id, months, created_at)
       VALUES ($1, $2, $3, NOW())
       RETURNING *`,
      [customer_id, car_id, months]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT o.id, c.fullname AS customer_name, ca.name AS car, o.months, o.created_at
       FROM orders o
       JOIN customers c ON c.id = o.customer_id
       JOIN cars ca ON ca.id = o.car_id`
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get('/overdue', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          cu.fullname AS customer_name,
          cu.phone AS customer_phone,
          ca.name AS car_name,
          o.months,
          p.amount AS due_amount,
          p.due_date
      FROM payments p
      JOIN orders o ON p.order_id = o.id
      JOIN customers cu ON o.customer_id = cu.id
      JOIN cars ca ON o.car_id = ca.id
      WHERE p.due_date < NOW() 
        AND p.amount > 0
      ORDER BY p.due_date ASC;
    `);

    res.json({ success: true, overduePayments: result.rows });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
