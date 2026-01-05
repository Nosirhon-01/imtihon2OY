CREATE DATABASE imtixon
CREATE TABLE IF NOT EXISTS Customer (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    age INT,
    contact VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Cars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INT,
    price INT,
    color VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    month_count INT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    customer_id INT NOT NULL REFERENCES Customer(id),
    car_id INT NOT NULL REFERENCES Cars(id)
);

CREATE TABLE IF NOT EXISTS Payments (
    id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES orders(id),
    created_at DATE NOT NULL,
    amount INT NOT NULL
);

CREATE OR REPLACE FUNCTION create_payment()
RETURNS TRIGGER AS $$
DECLARE
    car_price INT;
    initial_payment INT;
BEGIN
    SELECT price INTO car_price FROM Cars WHERE id = NEW.car_id;
    initial_payment := car_price * 20 / 100;
    INSERT INTO Payments(order_id, created_at, amount)
    VALUES (NEW.id, NEW.start_date, initial_payment);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_payment
AFTER INSERT ON orders
FOR EACH ROW
EXECUTE FUNCTION create_payment();

INSERT INTO Customer (full_name, age, contact) VALUES
('Ali Akbarov', 25, '998901234567'),
('Malika Karimova', 30, '998907654321');

INSERT INTO Cars (name, year, price, color) VALUES
('Toyota Camry', 2020, 30000, 'White'),
('BMW X5', 2022, 60000, 'Black');

INSERT INTO orders (month_count, start_date, end_date, customer_id, car_id) VALUES
(1, '2026-01-01', '2026-02-01', 1, 1),
(3, '2026-01-10', '2026-04-10', 2, 2);
