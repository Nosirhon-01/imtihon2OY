import pool from "../db.js";

export const getPayments = async (req, res) => {
  const { rows   } = await pool.query(
    `SELECT p.id, p.amount, p.created_at,
            o.id AS order_id, o.quantity, o.order_date,
            c.full_name, c.age, c.contact,
            ca.name AS car_name, ca.year AS car_year, ca.color AS car_color, ca.price AS car_price
     FROM payments p
     JOIN orders o ON p.order_id = o.id
     JOIN customers c ON o.customer_id = c.id
     JOIN cars ca ON o.car_id = ca.id
     ORDER BY p.created_at DESC`
  );
  res.status(200).json(rows);
};
