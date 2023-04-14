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


export const partialUpdateDemoItemService = async (
  paramsId: string,
  requestBody: DocumentDefinition<DemoDocument>
) => {
  const updateOps: DocumentDefinition<DemoDocument> = {};
  for (const ops of requestBody) {
    updateOps[ops.propName] = ops.value;
  }
  const query = await Demo.updateOne(
    { _id: paramsId },
    { $set: updateOps }
  ).exec();
  return query;
};

export const fullUpdateDemoItemService = async (
  paramsId: string,
  requestBody: DocumentDefinition<DemoDocument>
) => {
  let resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(
    paramsId,
    { $set: resetItem },
    { new: true }
  ).exec();
  return query;
};