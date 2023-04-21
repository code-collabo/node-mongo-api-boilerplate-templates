import mongoose from 'mongoose';

export type DemoDocument = {
  name: string;
  age: number;
} & mongoose.Document

const collectionName = 'demo';

const DemoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true }
});

const DemoModel = mongoose.model(collectionName, DemoSchema, collectionName); //declare collection name a second time to prevent mongoose from pluralizing or adding 's' to the collection name

export { DemoModel };
