import { neo4jDriver } from "../index.js";

// Search for lookups
export const searchLookups = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query)
      return res.status(400).json({ error: "Query parameter is required" });

    const session = neo4jDriver.session();
    const result = await session.run(
      `MATCH (l:Lookup) WHERE l.lookup CONTAINS $query RETURN l`,
      { query }
    );

    session.close();
    const lookups = result.records.map((record) => record.get("l").properties);
    res.json(lookups);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get lookup details
export const getLookupDetails = async (req, res) => {
  try {
    const lookupName = req.params.lookup;

    const session = neo4jDriver.session();
    const result = await session.run(
      `MATCH (l:Lookup {lookup: $lookup})<-[:HAS_LOOKUP]-(v:Verb) RETURN l, collect(v) AS verbs`,
      { lookup: lookupName }
    );

    session.close();
    if (result.records.length === 0) {
      return res.status(404).json({ error: "Lookup not found" });
    }

    const lookup = result.records[0].get("l").properties;
    const verbs = result.records[0].get("verbs").map((v) => v.properties);

    res.json({ ...lookup, verbs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
