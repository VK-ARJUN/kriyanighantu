import mongoose from "mongoose";

const verbSchema = new mongoose.Schema({
  verb: { type: String, required: true },
  lookup: { type: String },
  root: { type: String, required: true },
  ganam: { type: String, required: true },
  rootIndex: { type: Number, required: true },
  transVerb: { type: String, required: true },
  ItAgma: { type: String, required: true },
  derivation: { type: String },
  example: { type: String },
  reverseWord: { type: String },
  seeAlso: { type: [String] },
});

const Verb = mongoose.model("Verb", verbSchema);

export default Verb;
