import express from "express";
import { searchVerbs, getVerbDetails } from "../controllers/verbController.js";

const router = express.Router();

// Route to search for verbs or get all verbs
router.get("/", searchVerbs);

// Route to get details of a specific verb by name
router.get("/:verb", getVerbDetails);

export default router;
