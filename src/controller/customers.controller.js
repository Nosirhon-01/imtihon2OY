import pool from "../db.js";

export const createCustomer = async (req, res) => {
  const { full_name, age, contact } = req.body;
  if (!full_name || !age || !contact)
    return res.status(400).json({ message: "Hammasini to'ldiring" });

  const { rows } = await pool.query(
    "INSERT INTO customers(full_name, age, contact) VALUES($1,$2,$3) RETURNING *",
    [full_name, age, contact]
  );
  res.status(201).json(rows[0]);
};

export const getCustomers = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM customers");
  res.status(200).json(rows);
};
