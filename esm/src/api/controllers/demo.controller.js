import chalk from 'chalk';
import {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
} from '../services/demo.service';

const routeName = 'demo';
const item = `${routeName}-item`;

/* eslint-disable no-console */

const getDemoItemsController = async (req, res) => {
  try {
    const docs = await getDemoItemsService();
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
    console.log( chalk.greenBright(`GET request successful!`) );
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error retriving ${item}s: ${err}`) );
  }
};

const createDemoItemController = async (req, res) => {
  try {
    const doc = await createDemoItemService(req.body);
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
    console.log( chalk.greenBright(`${item} CREATED successfully!`) );
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error saving ${item}: ${err}`) );
  }
};

const getOneDemoItemController = async (req, res) => {
  try {
    const doc = await getOneDemoItemService(req.params.demoId);
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
      console.log( chalk.greenBright(`GET request successful!`) );
    } else {
      console.log( chalk.redBright('No record found for provided ID') );
      return res.status(404).json({
        message: 'No record found for provided ID',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error retriving ${item}: ${err}`) );
  }
};

const deleteDemoItemController = async (req, res) => {
  try {
    await deleteDemoItemService(req.params.demoId);
    console.log( chalk.greenBright(`${item} DELETED successfully!`) );
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
    console.log( chalk.redBright(`Error deleting ${item}: ${err}`) );
  }
};

const updateOneDemoItemPropertyValueController = async (req, res) => {
  try {
    const id = req.params.demoId;
    await updateOneDemoItemPropertyValueService(id, req.body);
    console.log( chalk.greenBright(`PATCH request for ID ${id} successful!`) );
    return res.status(200).json({
      message: 'Patch request successful!',
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Error updating ${item} property & value`,
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error updating ${item} property & value: ${err}`) );
  }
};

const updateDemoItemPropertyValuesController = async (req, res) => {
  try {
    const id = req.params.id;
    await updateDemoItemPropertyValuesService(id, req.body);
    console.log( chalk.greenBright(`PUT request for ID ${id} successful!`) );
    return res.status(200).json({
      message: `Put request successful!`,
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: `Error updating ${item}`,
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error updating ${item}: ${err}`) );
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
