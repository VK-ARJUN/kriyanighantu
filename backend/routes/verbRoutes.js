import express from "express";
import { getAllVerbs, searchVerbs } from "../controllers/verbController.js";

const router = express.Router();

router.get("/", getAllVerbs);
router.get("/search", searchVerbs);

export default router;
