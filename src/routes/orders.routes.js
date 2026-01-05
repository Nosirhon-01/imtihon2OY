import express from "express";
import { createOrder, getOrders, getExpiredOrders } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getOrders);
router.get("/expired", getExpiredOrders);

export default router;
