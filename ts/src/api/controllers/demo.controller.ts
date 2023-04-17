import { NextFunction, Request, Response } from 'express';
import {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
} from '../services/demo.service';

let routeName = 'demo';
let item = `${routeName}-item`;

export const getDemoItemsController = async (req: Request, res: Response) => {
  try {
    let docs = await getDemoItemsService();
    const response = {
      count: docs.length,
      items: docs.map((doc) => {
        return {
          _id: doc._id,
          name: doc.name,
          age: doc.age,
          request: {
            type: 'GET',
            url: `http://localhost:3000/${routeName}/${doc._id}`,
          },
        };
      }),
    };
    res.status(200).json(response);
    return response;
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
  }
};

export const createDemoItemController = async (req: Request, res: Response) => {
  try {
    let doc = await createDemoItemService(req.body);
    res.status(201).json({
      message: `${item} created successfully!`,
      newItem: {
        _id: doc._id,
        name: doc.name,
        age: doc.age,
        request: {
          type: 'GET',
          url: `http://localhost:3000/${routeName}/${doc._id}`,
        },
      },
    });
    return doc;
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
  }
};

export const getOneDemoItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let doc = await getOneDemoItemService(req.params.demoId);
    if (doc) {
      res.status(200).json({
        _id: doc._id,
        name: doc.name,
        age: doc.age,
        request: {
          type: 'GET',
          description: `Url link to all ${item}s`,
          url: `http://localhost:3000/${routeName}/`,
        },
      });
      return doc;
    } else {
      return res.status(404).json({
        message: 'No record found for provided ID',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`,
    });
  }
};

export const deleteDemoItemController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let doc = await deleteDemoItemService(req.params.demoId);
    res.status(200).json({
      message: `${item} deleted successfully!`,
      request: {
        type: 'POST',
        description: 'Url link to make post request to',
        url: `http://localhost:3000/${item}/`,
        body: {
          name: 'String',
          age: 'Number',
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Error deleting ${item}`,
      error: `${err}`,
    });
  }
};

export const updateOneDemoItemPropertyValueController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let doc = await updateOneDemoItemPropertyValueService(
      req.params.demoId,
      req.body
    );
    return res.status(200).json({
      message: 'Patch request successful!',
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${doc._id}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Error updating ${item} property & value`,
      error: `${err}`,
    });
  }
};

export const updateDemoItemPropertyValuesController = async (
  req: Request,
  res: Response
) => {
  try {
    let doc = await updateDemoItemPropertyValuesService(
      req.params.id,
      req.body
    );
    return res.status(200).json({
      message: `Put request successful!`,
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${doc._id}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Error updating ${item}`,
      error: `${err}`,
    });
  }
};
