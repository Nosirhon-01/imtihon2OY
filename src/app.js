import express from "express";
import carsRoutes from "./routes/cars.routes.js";
import customersRoutes from "./routes/customers.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import paymentsRoutes from "./routes/payments.routes.js";

const app = express();

app.use(express.json());

app.use("/cars", carsRoutes);
app.use("/customers", customersRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentsRoutes);

export default app;
