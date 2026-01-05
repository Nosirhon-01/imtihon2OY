CREATE DATABASE "Auto_sale";

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cars;
DROP TABLE IF EXISTS customers;

CREATE TABLE cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    year INT NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    color VARCHAR(50) NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    contact VARCHAR(50) NOT NULL
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    car_id INT REFERENCES cars(id),
    customer_id INT REFERENCES customers(id),
    quantity INT NOT NULL,
    order_date TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    amount NUMERIC(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION create_payment()
RETURNS TRIGGER AS $$
DECLARE
    car_price NUMERIC;
    initial_payment NUMERIC;
BEGIN
    SELECT price INTO car_price FROM cars WHERE id = NEW.car_id;
    initial_payment := car_price * 20 / 100;
    INSERT INTO payments(order_id, amount, created_at)
    VALUES (NEW.id, initial_payment, NEW.order_date);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_payment
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION create_payment();
