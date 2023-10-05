import { Request, Response } from 'express';
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

let response: { [key: string]: unknown } = {};

export const getDemoItemsController = async (req: Request, res: Response) => {
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
}

export const createDemoItemController = async (req: Request, res: Response) => {
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
}

export const getOneDemoItemController = async (req: Request, res: Response) => {
  try {
    const doc = await getOneDemoItemService(req.params.demoId);
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
  } catch (err) {
    error(`ERROR retrieving ${item}`);
    res.status(500).json({
      message: `ERROR retrieving ${item}`,
      error: `${err}`,
    });
  }
}

export const deleteDemoItemController = async (req: Request, res: Response) => {
  try {
    await deleteDemoItemService(req.params.demoId);
    response = {
      message: `DELETE (delete specific ${item}) request successfull`,
    }
    success(`DELETE (delete specific ${item}) request successfull`);
    return res.status(200).json(response);
  } catch (err) {
    error(`ERROR deleting specified ${item}`);
    res.status(500).json({
      message: `ERROR deleting specified ${item}`,
      error: `${err}`,
    });
  }
};

export const updateOneDemoItemPropertyValueController = async (req: Request, res: Response) => {
  try {
    const doc = await updateOneDemoItemPropertyValueService(req.params.demoId, req.body);
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
  } catch (err) {
    error(`ERROR updating ${item} property`);
    res.status(500).json({
      message: `ERROR updating ${item} property`,
      error: `${err}`,
    });
  }
};

export const updateDemoItemPropertyValuesController = async (req: Request, res: Response) => {
  try {
    const doc = await updateDemoItemPropertyValuesService(req.params.demoId, req.body);
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
  } catch (err) {
    error(`ERROR updating ${item} properties`);
    res.status(500).json({
      message: `ERROR updating ${item} properties`,
      error: `${err}`,
    });
  }
};
