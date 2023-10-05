import {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
} from '../services/demo.service';
import { success, error } from '../../../node-mongo-helpers';

const routeName = 'demo';
const item = `${routeName}-item`;

let response = {};

const getDemoItemsController = async (req, res) => {
  try {
    const docs = await getDemoItemsService();
    response = {
      message: `GET (find all ${item}s) Request Successful`,
      count: docs.length,
      items: docs.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
        };
      }),
    };
    success(`GET (find all ${item}s) Request Successful`);
    return res.status(200).json(response);
  } catch (err) {
    error(`ERROR retrieving all ${item}s`);
    res.status(500).json({
      message: `ERROR retrieving all ${item}s`,
      error: `${err}`,
    });
  }
};

const createDemoItemController = async (req, res) => {
  try {
    const doc = await createDemoItemService(req.body);
    response = {
      message: `POST (create a ${item}) request successfull`,
      item: {
        _id: doc._id,
        name: doc.name,
        age: doc.age,
      },
    }
    success(`POST (create a ${item}) request successfull`);
    return res.status(201).json(response);
  } catch (err) {
    error(`ERROR creating ${item}`);
    res.status(500).json({
      message: `ERROR creating ${item}`,
      error: `${err}`,
    });
  }
};

const getOneDemoItemController = async (req, res) => {
  try {
    const doc = await getOneDemoItemService(req.params.demoId);
    if (doc) {
      response = {
        message: `GET (find one ${item}) request successfull`,
        item: {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
        },
      }
      success(`GET (find one ${item}) request successfull`);
      return res.status(200).json(response);
    } else {
      throw new Error('No record found for provided ID');
    }
  } catch (err) {
    error(`ERROR retrieving ${item}`);
    res.status(500).json({
      message: `ERROR retrieving ${item}`,
      error: `${err}`,
    });
  }
};

const deleteDemoItemController = async (req, res) => {
  try {
    const check = await deleteDemoItemService(req.params.demoId);
    if (check.deletedCount !== 0){
      response = {
        message: `DELETE (delete specific ${item}) request successfull`,
      }
      success(`DELETE (delete specific ${item}) request successfull`);
      return res.status(200).json(response);
    } else {
      throw new Error('No record found for provided ID');
    }
  } catch (err) {
    error(`ERROR deleting specified ${item}`);
    res.status(500).json({
      message: `ERROR deleting specified ${item}`,
      error: `${err}`,
    });
  }
};

const updateOneDemoItemPropertyValueController = async (req, res) => {
  try {
    const doc = await updateOneDemoItemPropertyValueService(req.params.demoId, req.body);
    if (doc) {
      response = {
        message: `PATCH (update specific ${item} property) request successfull`,
        item: {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
        },
      }
      success(`PATCH (update specific ${item} property) request successfull`);
      return res.status(200).json(response);
    } else {
      throw new Error('No record found for provided ID');
    }
  } catch (err) {
    error(`ERROR updating ${item} property`);
    res.status(500).json({
      message: `ERROR updating ${item} property`,
      error: `${err}`,
    });
  }
};

const updateDemoItemPropertyValuesController = async (req, res) => {
  try {
    const doc = await updateDemoItemPropertyValuesService(req.params.demoId, req.body);
    if (doc) {
      response = {
        message: `PUT (update ${item} properties) request successfull`,
        item: {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
        },
      }
      success(`PUT (update ${item} properties) request successfull`);
      return res.status(200).json(response);
    } else {
      throw new Error('No record found for provided ID');
    }
  } catch (err) {
    error(`ERROR updating ${item} properties`);
    res.status(500).json({
      message: `ERROR updating ${item} properties`,
      error: `${err}`,
    });
  }
};

export {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
  updateOneDemoItemPropertyValueController,
  updateDemoItemPropertyValuesController,
};
