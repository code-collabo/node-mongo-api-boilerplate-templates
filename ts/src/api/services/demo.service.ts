import { DemoDocument, DemoModel as Demo } from '../models/demo.model';

export const getDemoItemsService = async () => {
  const query = await Demo.find().select('_id name age').exec();
  return query;
}

export const createDemoItemService = async (requestBody: DemoDocument): Promise<DemoDocument> => {
  const demo = new Demo({
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

// const testFn = (obj: DemoDocument, key: keyof DemoDocument, value: (any |never) ) => {
//   obj[key] = value
// }

export const updateOneDemoItemPropertyValueService = async (paramsId: string, requestBody: DemoDocument) => {

  const queryDoc = await Demo.findById(paramsId).select('_id name age').exec() as DemoDocument;

  Object.keys(requestBody).forEach(key => {
    if(key in queryDoc)
      queryDoc[key as keyof DemoDocument] = requestBody[key as keyof DemoDocument] as never;
    else 
      throw new Error(`property '${key}' does not exist in the mongoose model`)
    // queryDoc[key as keyof DemoDocument] = requestBody[key as keyof DemoDocument] as never;
  });

  const save = await queryDoc.save();
  return save;
};

export const updateDemoItemPropertyValuesService = async (paramsId: string, requestBody: DemoDocument) => {
  const resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };
  const query = await Demo.findByIdAndUpdate(paramsId, { $set: resetItem }, { new: true }).exec();
  return query;
};
