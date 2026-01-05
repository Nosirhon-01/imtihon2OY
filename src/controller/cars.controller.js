import pool from "../db.js";

export const createCar = async (req, res) => {
  const { name, year, price, color } = req.body;
  if (!name || !year || !price || !color)
    return res.status(400).json({ message: "Hammasini to'ldiring" });

  const { rows } = await pool.query(
    "INSERT INTO cars(name, year, price, color) VALUES($1,$2,$3,$4) RETURNING *",
    [name, year, price, color]
  );
  res.status(201).json(rows[0]);
};

export const getCars = async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM cars");
  res.status(200).json(rows);
};
