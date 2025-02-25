import { neo4jDriver } from "../index.js";

// Search for verbs based on a query
export const searchVerbs = async (req, res) => {
  try {
    const query = req.query.q;
    if (!query)
      return res.status(400).json({ error: "Query parameter is required" });

    const session = neo4jDriver.session();
    const result = await session.run(
      `MATCH (v:Verb) WHERE v.verb CONTAINS $query RETURN v`,
      { query }
    );

    session.close();
    const verbs = result.records.map((record) => record.get("v").properties);
    res.json(verbs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get verb details, including lookups and synonyms
export const getVerbDetails = async (req, res) => {
  try {
    const verbName = req.params.verb;
    const session = neo4jDriver.session();

    const result = await session.run(
      `MATCH (v:Verb {verb: $verb})-[:HAS_LOOKUP]->(l:Lookup) 
       OPTIONAL MATCH (s:Verb)-[:HAS_LOOKUP]->(l) WHERE s <> v
       RETURN v, COLLECT(DISTINCT l) AS lookups, COLLECT(DISTINCT s) AS synonyms`,
      { verb: verbName }
    );

    session.close();

    if (result.records.length === 0) {
      return res.status(404).json({ error: "Verb not found" });
    }

    const verb = result.records[0].get("v").properties;
    const lookups = result.records[0]
      .get("lookups")
      .map((lookup) => lookup.properties);
    const synonyms = result.records[0]
      .get("synonyms")
      .map((synonym) => synonym.properties.verb);

    res.json({
      ...verb,
      meanings: lookups.map((lookup) => lookup.englishMeaning),
      lookups, // Full lookup details
      synonyms, // List of synonymous verb names
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
