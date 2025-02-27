import express from "express";
import {
  searchLookups,
  getAllLookups,
} from "../controllers/lookupController.js";

const router = express.Router();

router.get("/search", searchLookups);
router.get("/", getAllLookups);

export default router;
