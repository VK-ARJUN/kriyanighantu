import Root from "../models/root.schema.js";
import Verb from "../models/verb.schema.js";

// Get all roots sorted alphabetically (Sanskrit order assumed)
export const getAllRoots = async (req, res) => {
  try {
    const roots = await Root.find().sort({ root: 1 }); // Sorting alphabetically

    // Fetch associated verbs for each root
    const rootsWithVerbs = await Promise.all(
      roots.map(async (root) => {
        const verbs = await Verb.find({ root: root.root }).select("verb");
        return { ...root.toObject(), verbs: verbs.map((v) => v.verb) };
      })
    );

    res.json(rootsWithVerbs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

// Search for roots (case-insensitive)
export const searchRoots = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const roots = await Root.find({
      root: { $regex: new RegExp(query, "i") }, // Case-insensitive regex search
    }).sort({ root: 1 });

    // Fetch associated verbs for each root
    const rootsWithVerbs = await Promise.all(
      roots.map(async (root) => {
        const verbs = await Verb.find({ root: root.root }).select("verb");
        return { ...root.toObject(), verbs: verbs.map((v) => v.verb) };
      })
    );

    res.json(rootsWithVerbs);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
