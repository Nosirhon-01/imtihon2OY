import express from "express";
import { getPayments } from "../controllers/payments.controller.js";

const router = express.Router();

router.get("/", getPayments);

export default router;
