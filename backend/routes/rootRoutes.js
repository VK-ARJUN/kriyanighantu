import express from "express";
import { getRootDetails, searchRoots } from "../controllers/rootController.js";

const router = express.Router();

router.get("/", searchRoots);
router.get("/:root", getRootDetails);

export default router;
