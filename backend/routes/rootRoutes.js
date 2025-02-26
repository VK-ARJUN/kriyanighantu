import express from "express";
import { getAllRoots, searchRoots } from "../controllers/rootController.js";

const router = express.Router();

router.get("/search", searchRoots);
router.get("/", getAllRoots);

export default router;
