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
  const savedDoc = await demo.save();
  return savedDoc;
}

export const getOneDemoItemService = async (paramsId: string) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }
  return query;
}

export const deleteDemoItemService = async (paramsId: string) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  if(query.deletedCount === 0){
    throw new Error('No record found for provided ID');
  }
  return query;
}

export const updateOneDemoItemPropertyValueService = async (paramsId: string, requestBody: { propName: string, value: string  }[]) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }

  for (const ops of requestBody) {
    query[ops.propName as keyof DemoDocument] = ops.value as never;
  }

  // for (const ops of requestBody) {
  //   if(ops.propName as keyof DemoDocument in query)
  //     query[ops.propName as keyof DemoDocument] = ops.value as never;
  //   else 
  //     throw new Error(`property '${ops.propName}' does not exist in the mongoose model`)
  // }

  const savedDoc = await query.save();
  return savedDoc;
};

export const updateDemoItemPropertyValuesService = async (paramsId: string, requestBody: DemoDocument) => {
  const query = await Demo.findById(paramsId).select('_id name age').exec();
  if(!query){
    throw new Error('No record found for provided ID');
  }

  query.name = requestBody.name;
  query.age = requestBody.age;
  
  const savedDoc = await query.save();
  return savedDoc;
};
