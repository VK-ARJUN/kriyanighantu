import express from "express";
import {
  searchLookups,
  getLookupDetails,
} from "../controllers/lookupController.js";

const router = express.Router();

router.get("/", searchLookups);
router.get("/:lookup", getLookupDetails);

export default router;
