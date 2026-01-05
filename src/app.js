import express from 'express';
import cors from 'cors';

import carsRoutes from './routes/cars.routes.js';
import customersRoutes from './routes/customers.routes.js';
import ordersRoutes from './routes/orders.routes.js';
import paymentRoutes from './routes/payment.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/cars', carsRoutes);
app.use('/customers', customersRoutes);
app.use('/orders', ordersRoutes);
app.use('/payments',paymentRoutes)



export default app;
