import pool from "../db.js";

export const createOrder = async (req, res) => {
  const { car_id, customer_id, quantity, order_date } = req.body;
  if (!car_id || !customer_id || !quantity || !order_date)
    return res.status(400).json({ message: "Hammasini to'ldiring" });

  const { rows } = await pool.query(
    "INSERT INTO orders(car_id, customer_id, quantity, order_date) VALUES($1,$2,$3,$4) RETURNING *",
    [car_id, customer_id, quantity, order_date]
  );
  res.status(201).json(rows[0]);
};

export const getOrders = async (req, res) => {
  const { rows } = await pool.query(
    `SELECT o.id AS order_id, o.quantity, o.order_date,
            c.full_name, c.age, c.contact,
            ca.name AS car_name, ca.year AS car_year, ca.color AS car_color, ca.price AS car_price
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     JOIN cars ca ON o.car_id = ca.id
     ORDER BY o.order_date DESC`
  );
  res.status(200).json(rows);
};

export const getExpiredOrders = async (req, res) => {
  const { rows } = await pool.query(
    `SELECT o.id AS order_id, o.quantity, o.order_date,
            c.full_name, c.age, c.contact,
            ca.name AS car_name, ca.year AS car_year, ca.color AS car_color, ca.price AS car_price
     FROM orders o
     JOIN customers c ON o.customer_id = c.id
     JOIN cars ca ON o.car_id = ca.id
     WHERE o.order_date < NOW()
     ORDER BY o.order_date DESC`
  );
  res.status(200).json(rows);
};
