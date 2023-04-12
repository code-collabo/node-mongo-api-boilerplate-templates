import { DemoModel as Demo } from "../models/demo.model";

/*======================
  operations for /demo
=======================*/

const getDemoItemsService = async () => {
  const query = await Demo.find().select("_id name age").exec();
  return query;
};

const createDemoItemService = async (requestBody) => {
  let demo = new Demo({
    name: requestBody.name,
    age: requestBody.age,
  });

  const save = await demo.save();
  return save;
};


/*=============================
  operations for /demo/demoId
==============================*/

const getOneDemoItemService = async (paramsId) => {
  const query = Demo.findById(paramsId).select("_id name age").exec();
  return query;
};

const deleteDemoItemService = async (paramsId) => {
  const query = await Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};



export {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
};
