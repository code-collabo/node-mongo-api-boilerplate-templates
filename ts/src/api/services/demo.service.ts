import { DocumentDefinition } from 'mongoose';
import { DemoDocument, DemoModel as Demo } from '../models/demo.model';

export const getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
}

export const createDemoItemService = async (requestBody: DocumentDefinition<DemoDocument>) => {
  let demo = new Demo({
    name: requestBody.name,
    age: requestBody.age
  });

  const save = await demo.save();
  return save;
}

export const getOneDemoItemService = async (paramsId: string) => {
  const query = Demo.findById(paramsId).select('_id name age').exec();
  return query;
}

export const deleteDemoItemService = async (paramsId: string) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
}