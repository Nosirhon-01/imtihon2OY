import express from "express";
import { createCar, getCars } from "../controllers/cars.controller.js";

const router = express.Router();

router.post("/", createCar);
router.get("/", getCars);

export default router;
