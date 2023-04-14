let Demo = require("../models/demo.model");

/*======================
  operations for /demo
=======================*/
const getDemoItemsService = () => {
  const query = Demo.find().select("_id name age").exec();
  return query;
};

const createDemoItemService = (req) => {
  let demo = new Demo({
    name: req.body.name,
    age: req.body.age,
  });

  return demo.save();
};

/*=============================
  operations for /demo/demoId
==============================*/

const getOneDemoItemService = (paramsId) => {
  const query = Demo.findById(paramsId).select("_id name age").exec();
  return query;
};

const deleteDemoItemService = (paramsId) => {
  const query = Demo.deleteOne({ _id: paramsId }).exec();
  return query;
};

const partialUpdateDemoItemService = (paramsId, requestBody) => {
  const updateOps = {};
  for (const ops of requestBody) {
    updateOps[ops.propName] = ops.value;
  }
  const query = Demo.updateOne({ _id: paramsId }, { $set: updateOps }).exec();
  return query;
};

const fullUpdateDemoItemService = (paramsId, requestBody) => {
  let resetItem = {
    name: requestBody.name,
    age: requestBody.age,
  };

  const query = Demo.findByIdAndUpdate(
    paramsId,
    { $set: resetItem },
    { new: true }
  ).exec();
  return query;
};

module.exports = {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  partialUpdateDemoItemService,
  fullUpdateDemoItemService,
};