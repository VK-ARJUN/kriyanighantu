import { neo4jDriver } from "../index.js";

// Get all lookups
export const getAllLookups = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const result = await session.run(
      `MATCH (l:Lookup)
      OPTIONAL MATCH (v:Verb)-[:HAS_LOOKUP]->(l)
      RETURN l, collect(v.verb) AS verbs`
    );

    const lookups = result.records.map((record) => {
      const lookupNode = record.get("l").properties;
      const verbs = record.get("verbs")
        ? record.get("verbs").filter(Boolean)
        : [];

      return {
        lookup: lookupNode.lookup || "-",
        englishMeaning: lookupNode.englishMeaning || "-",
        reference: lookupNode.reference || "-",
        verbs, // Only verb names as an array
      };
    });

    res.json(lookups);
  } catch (error) {
    console.error("Error fetching lookups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await session.close();
  }
};

// Search lookups
export const searchLookups = async (req, res) => {
  const session = neo4jDriver.session();
  const { query } = req.query;

  try {
    const result = await session.run(
      `MATCH (l:Lookup)
      WHERE toLower(l.lookup) CONTAINS toLower($query) OR toLower(l.englishMeaning) CONTAINS toLower($query)
      OPTIONAL MATCH (v:Verb)-[:HAS_LOOKUP]->(l)
      RETURN l, collect(v.verb) AS verbs,
      CASE 
        WHEN toLower(l.lookup) = toLower($query) THEN 3  // Exact match
        WHEN toLower(l.lookup) STARTS WITH toLower($query) THEN 2  // Prefix match
        ELSE 1  // Partial match
      END AS priority
      ORDER BY priority DESC, l.lookup`,
      { query }
    );

    const lookups = result.records.map((record) => {
      const lookupNode = record.get("l").properties;
      const verbs = record.get("verbs")
        ? record.get("verbs").filter(Boolean)
        : [];

      return {
        lookup: lookupNode.lookup || "-",
        englishMeaning: lookupNode.englishMeaning || "-",
        reference: lookupNode.reference || "-",
        verbs, // Only verb names as an array
      };
    });

    res.json(lookups);
  } catch (error) {
    console.error("Error searching lookups:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await session.close();
  }
};
