import { neo4jDriver } from "./index.js";
import Verb from "./models/verb.schema.js";
import Lookup from "./models/lookup.schema.js";

// Function to sync new Verbs to Neo4j
async function syncVerbToNeo4j(verb) {
  const session = neo4jDriver.session();
  try {
    await session.run(
      `
      MERGE (v:Verb {_id: $_id})  // Use _id as the unique identifier
      SET v.verb = $verb,
          v.ganam = $ganam,
          v.lookup = $lookup,
          v.root = $root,
          v.rootIndex = $rootIndex, 
          v.transVerb = $transVerb, 
          v.ItAgma = $ItAgma, 
          v.derivation = $derivation, 
          v.example = $example,
          v.seeAlso = $seeAlso
      WITH v
      MATCH (l:Lookup {lookup: $lookup})
      MERGE (v)-[:HAS_LOOKUP]->(l)
      `,
      {
        _id: verb._id.toString(), // Store MongoDB _id as a string
        verb: verb.verb,
        ganam: verb.ganam,
        root: verb.root,
        rootIndex: verb.rootIndex,
        transVerb: verb.transVerb,
        ItAgma: verb.ItAgma,
        derivation: verb.derivation,
        example: verb.example,
        seeAlso: verb.seeAlso,
        lookup: verb.lookup,
      }
    );
    console.log(`✅ Synced Verb to Neo4j: ${verb.verb} (${verb._id})`);
  } catch (err) {
    console.error("❌ Neo4j Verb sync error:", err);
  } finally {
    await session.close();
  }
}

// Function to update existing Verbs in Neo4j
async function updateVerbInNeo4j(verb) {
  const session = neo4jDriver.session();
  try {
    await session.run(
      `
      MATCH (v:Verb {_id: $_id})-[r:HAS_LOOKUP]->(oldLookup)
      DELETE r
      WITH v
      SET v.verb = $verb,
          v.ganam = $ganam,
          v.lookup = $lookup,
          v.root = $root, 
          v.rootIndex = $rootIndex, 
          v.transVerb = $transVerb, 
          v.ItAgma = $ItAgma, 
          v.derivation = $derivation, 
          v.example = $example,
          v.seeAlso = $seeAlso
      WITH v
      MATCH (l:Lookup {lookup: $lookup})
      MERGE (v)-[:HAS_LOOKUP]->(l)
      RETURN v
      `,
      {
        _id: verb._id.toString(), // Use _id for matching
        verb: verb.verb,
        ganam: verb.ganam,
        root: verb.root,
        rootIndex: verb.rootIndex,
        transVerb: verb.transVerb,
        ItAgma: verb.ItAgma,
        derivation: verb.derivation,
        example: verb.example,
        seeAlso: verb.seeAlso,
        lookup: verb.lookup,
      }
    );
    console.log(`✅ Updated Verb in Neo4j: ${verb.verb} (${verb._id})`);
  } catch (err) {
    console.error("❌ Neo4j Verb update error:", err);
  } finally {
    await session.close();
  }
}

// Function to delete Verbs in Neo4j
async function deleteVerbFromNeo4j(verbId) {
  if (!verbId) {
    console.error("❌ No _id provided for deletion.");
    return;
  }

  const session = neo4jDriver.session();
  try {
    await session.run(
      `
      MATCH (v:Verb {_id: $verbId})
      DETACH DELETE v
      `,
      { verbId }
    );
    console.log(`🗑️ Deleted Verb from Neo4j with _id: ${verbId}`);
  } catch (err) {
    console.error("❌ Neo4j Verb deletion error:", err);
  } finally {
    await session.close();
  }
}

// Watch for changes in the Verb collection
Verb.watch().on("change", async (change) => {
  if (change.operationType === "insert") {
    console.log("🆕 New Verb detected. Syncing...");
    syncVerbToNeo4j(change.fullDocument);
  } else if (change.operationType === "update") {
    console.log("🔄 Verb update detected. Syncing...");
    const updatedVerb = await Verb.findById(change.documentKey._id);
    if (updatedVerb) {
      updateVerbInNeo4j(updatedVerb);
    }
  } else if (change.operationType === "delete") {
    console.log("🗑️ Verb deletion detected. Removing from Neo4j...");
    const deletedVerbId = change.documentKey._id.toString(); // Get _id
    deleteVerbFromNeo4j(deletedVerbId);
  }
});

const lookupCache = new Map(); // Cache to store lookup values before deletion

// Function to sync new Lookups to Neo4j
async function syncLookupToNeo4j(lookup) {
  const session = neo4jDriver.session();
  try {
    await session.run(
      `
      MERGE (l:Lookup {lookup: $lookup})
      SET l.lookup = $lookup,
          l.englishMeaning = $englishMeaning, 
          l.reference = $reference
      `,
      {
        lookup: lookup.lookup,
        englishMeaning: lookup.englishMeaning,
        reference: lookup.reference,
      }
    );
    console.log(`✅ Synced Lookup to Neo4j: ${lookup.lookup}`);
    lookupCache.set(lookup._id.toString(), lookup.lookup); // Store lookup in cache
  } catch (err) {
    console.error("❌ Neo4j Lookup sync error:", err);
  } finally {
    await session.close();
  }
}

// Function to update existing Lookups in Neo4j
async function updateLookupInNeo4j(lookup) {
  const session = neo4jDriver.session();
  try {
    await session.run(
      `
      MATCH (l:Lookup {lookup: $lookup})
      SET l.lookup = $lookup,
          l.englishMeaning = $englishMeaning, 
          l.reference = $reference
      RETURN l
      `,
      {
        lookup: lookup.lookup,
        englishMeaning: lookup.englishMeaning,
        reference: lookup.reference,
      }
    );
    console.log(`✅ Updated Lookup in Neo4j: ${lookup.lookup}`);
    lookupCache.set(lookup._id.toString(), lookup.lookup); // Update cache
  } catch (err) {
    console.error("❌ Neo4j Lookup update error:", err);
  } finally {
    await session.close();
  }
}

// Function to delete Lookup from Neo4j
async function deleteLookupFromNeo4j(lookupValue) {
  const session = neo4jDriver.session();
  try {
    if (!lookupValue) {
      throw new Error("Missing lookup parameter");
    }

    const result = await session.run(
      `
      MATCH (l:Lookup {lookup: $lookup})
      OPTIONAL MATCH (v:Verb)-[:HAS_LOOKUP]->(l)
      WITH l, COUNT(v) AS verbCount
      WHERE verbCount = 0
      DETACH DELETE l
      `,
      { lookup: lookupValue }
    );

    if (result.summary.counters.updates().nodesDeleted > 0) {
      console.log(`🗑️ Deleted Lookup from Neo4j: ${lookupValue}`);
    } else {
      console.log(
        `⚠️ Lookup not deleted (referenced by a Verb): ${lookupValue}`
      );
    }
  } catch (err) {
    console.error("❌ Neo4j Lookup deletion error:", err);
  } finally {
    await session.close();
  }
}

// Watch for changes in the Lookup collection
Lookup.watch().on("change", async (change) => {
  if (change.operationType === "insert") {
    console.log("🆕 New Lookup detected. Syncing...");
    syncLookupToNeo4j(change.fullDocument);
  } else if (change.operationType === "update") {
    console.log("🔄 Lookup update detected. Syncing...");
    const updatedLookup = await Lookup.findById(change.documentKey._id);
    if (updatedLookup) {
      lookupCache.set(change.documentKey._id.toString(), updatedLookup.lookup); // Store lookup before deletion
      updateLookupInNeo4j(updatedLookup);
    }
  } else if (change.operationType === "delete") {
    console.log("🗑 Lookup deletion detected. Deleting from Neo4j...");

    const lookupValue = lookupCache.get(change.documentKey._id.toString()); // Retrieve stored lookup
    if (lookupValue) {
      await deleteLookupFromNeo4j(lookupValue);
      lookupCache.delete(change.documentKey._id.toString()); // Remove from cache after deletion
    } else {
      console.log(
        "⚠️ Lookup value not found in cache. Skipping Neo4j deletion."
      );
    }
  }
});

console.log("🚀 MongoDB to Neo4j Sync Service Started...");
