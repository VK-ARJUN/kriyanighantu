import Root from "../models/root.schema.js";

// Search for roots
export const searchRoots = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query)
      return res.status(400).json({ error: "Query parameter is required" });

    const roots = await Root.find({ root: { $regex: query, $options: "i" } });
    res.json(roots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get root details from MongoDB
export const getRootDetails = async (req, res) => {
  try {
    const rootName = req.params.root;
    const root = await Root.findOne({ root: rootName });

    if (!root) return res.status(404).json({ error: "Root not found" });

    res.json(root);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
