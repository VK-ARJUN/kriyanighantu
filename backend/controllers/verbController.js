import { neo4jDriver } from "../index.js";

// Get all verbs from Neo4j
export const getAllVerbs = async (req, res) => {
  const session = neo4jDriver.session();
  try {
    const result = await session.run(
      `MATCH (v:Verb)-[:HAS_LOOKUP]->(l:Lookup)
      OPTIONAL MATCH (v)-[:HAS_LOOKUP]->(sa:Lookup)
      OPTIONAL MATCH (syn:Verb)-[:HAS_LOOKUP]->(l)
      RETURN v, l, v.seeAlso AS seeAlso, collect(DISTINCT syn) AS synonyms
      ORDER BY v.verb`
    );

    const verbs = result.records.map((record) => {
      const verbNode = record.get("v").properties;
      const lookupNode = record.get("l").properties;
      const seeAlso = record.get("seeAlso")
        ? record.get("seeAlso").filter((name) => name && name.trim() !== "")
        : [];
      const synonyms = record
        .get("synonyms")
        .map((syn) => syn.properties)
        .filter((syn) => syn.verb !== verbNode.verb);

      return {
        id: verbNode._id || "-",
        verb: verbNode.verb || "-",
        lookup: lookupNode.lookup || "-",
        lookupMeaning: lookupNode.englishMeaning || "-",
        root: verbNode.root || "-",
        rootIndex: verbNode.rootIndex || "-",
        ganam: verbNode.ganam || "-",
        transVerb: verbNode.transVerb || "-",
        ItAgma: verbNode.ItAgma || "-",
        derivation: verbNode.derivation || "-",
        example: verbNode.example || "-",
        seeAlso,
        synonyms,
      };
    });

    res.json(verbs);
  } catch (error) {
    console.error("Error fetching verbs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await session.close();
  }
};

export const searchVerbs = async (req, res) => {
  const session = neo4jDriver.session();
  const { query } = req.query;

  try {
    const result = await session.run(
      `MATCH (v:Verb)-[:HAS_LOOKUP]->(l:Lookup)
      WHERE toLower(v.verb) CONTAINS toLower($query) OR toLower(l.lookup) CONTAINS toLower($query)
      OPTIONAL MATCH (v)-[:HAS_LOOKUP]->(sa:Lookup)
      OPTIONAL MATCH (syn:Verb)-[:HAS_LOOKUP]->(l)
      RETURN v, l, collect(v.seeAlso) AS seeAlso, collect(DISTINCT syn) AS synonyms,
      CASE 
        WHEN toLower(v.verb) = toLower($query) THEN 3  // Exact match
        WHEN toLower(v.verb) STARTS WITH toLower($query) THEN 2  // Prefix match
        ELSE 1  // Partial match
      END AS priority
      ORDER BY priority DESC, v.verb`,
      { query }
    );

    const verbs = result.records.map((record) => {
      const verbNode = record.get("v").properties;
      const lookupNode = record.get("l").properties;
      const seeAlso = record.get("seeAlso")
        ? record
            .get("seeAlso")
            .filter((name) => typeof name === "string" && name.trim() !== "")
        : [];
      const synonyms = record
        .get("synonyms")
        .map((syn) => syn.properties)
        .filter((syn) => syn.verb !== verbNode.verb);

      return {
        id: verbNode.id || "-",
        verb: verbNode.verb || "-",
        lookup: lookupNode.lookup || "-",
        lookupMeaning: lookupNode.englishMeaning || "-",
        root: verbNode.root || "-",
        rootIndex: verbNode.rootIndex || "-",
        ganam: verbNode.ganam || "-",
        transVerb: verbNode.transVerb || "-",
        ItAgma: verbNode.ItAgma || "-",
        derivation: verbNode.derivation || "-",
        example: verbNode.example || "-",
        seeAlso,
        synonyms,
      };
    });

    res.json(verbs);
  } catch (error) {
    console.error("Error searching verbs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await session.close();
  }
};
