import { DemoModel as Demo } from '../models/demo.model';

export const getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
};

export const createDemoItemService = async (requestBody) => {
  const demo = new Demo({
    name: requestBody.name,
    age: requestBody.age,
  });
  const save = await demo.save();
  return save;
};

export const getOneDemoItemService = async (paramsId) => {
  const query = Demo.findById(paramsId).select('_id name age').exec();
  return query;
};

export const deleteDemoItemService = async (paramsId) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};

export const updateOneDemoItemPropertyValueService = async (paramsId, requestBody) => {
  const queryDoc = await Demo.findById(paramsId).select('_id name age').exec();

  for (const ops of requestBody) {
    queryDoc[ops.propName] = ops.value;
  }

  const save = await queryDoc.save();
  return save;
};

export const updateDemoItemPropertyValuesService = async (paramsId, requestBody) => {
  const resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(paramsId, { $set: resetItem }, { new: true }).exec();
  return query;
};
