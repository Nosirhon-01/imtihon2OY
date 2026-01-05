import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'Auto_sale',
  port: 5432
});

export default pool;
