import mongoose from "mongoose";

const lookupSchema = new mongoose.Schema({
  lookup: { type: String, required: true, unique: true },
  englishMeaning: { type: String, required: true },
  reference: { type: String, required: true },
});

const Lookup = mongoose.model("Lookup", lookupSchema);

export default Lookup;
