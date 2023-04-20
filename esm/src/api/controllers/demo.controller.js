import chalk from 'chalk';
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

/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

const getDemoItemsController = async (req, res) => {
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
    console.log( chalk.greenBright(`\nGET request successful! \n\nRunning at http://localhost:3000/${routeName}/\n`) );
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`\nError retriving ${item}s: ${err}\n`) );
  }
};

const createDemoItemController = async (req, res) => {
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
    console.log( chalk.greenBright(`\n${item} CREATED successfully! \n\nCreated ${item} url: http://localhost:3000/${routeName}/${doc._id}\n`) );
  } catch (err) {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`\nError saving ${item}: ${err}\n`) );
  }
};

const getOneDemoItemController = async (req, res, next) => {
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
      console.log( chalk.greenBright(`\nGET request successful! \n\n${item} url: http://localhost:3000/${routeName}/${doc._id}\n`) );
    } else {
      console.log( chalk.redBright('\nNo record found for provided ID\n') );
      return res.status(404).json({
        message: 'No record found for provided ID',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`,
    });
    console.log( chalk.redBright(`\nError retriving ${item}: ${err}\n`) );
  }
};

const deleteDemoItemController = async (req, res, next) => {
  try {
    let doc = await deleteDemoItemService(req.params.demoId);
    console.log( chalk.greenBright(`\n${item} DELETED successfully!\n`) );
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
    console.log( chalk.redBright(`\nError deleting ${item}: ${err}\n`) );
  }
};

const updateOneDemoItemPropertyValueController = async (req, res, next) => {
  try {
    const id = req.params.demoId;
    let doc = await updateOneDemoItemPropertyValueService(id, req.body);
    console.log( chalk.greenBright(`\nPATCH request for ID ${id} successful! \n\nUpdated ${item} url: http://localhost:3000/${routeName}/${id}\n`) );
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
    console.log( chalk.redBright(`\nError updating ${item} property & value: ${err}\n`) );
  }
};

const updateDemoItemPropertyValuesController = async (req, res) => {
  try {
    const id = req.params.id;
    let doc = await updateDemoItemPropertyValuesService(id, req.body);
    console.log( chalk.greenBright(`\nPUT request for ID ${id} successful! \n\nUpdated ${item} url: http://localhost:3000/${routeName}/${id}\n`) );
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
    console.log( chalk.redBright(`\nError updating ${item}: ${err}\n`) );
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
