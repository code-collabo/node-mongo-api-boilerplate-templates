const chalk = require('chalk');
const {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
  updateOneDemoItemPropertyValueService,
  updateDemoItemPropertyValuesService,
} = require('../services/demo.service');

const routeName = 'demo';
const item = `${routeName}-item`;

/* eslint-disable no-console */

const getDemoItemsController = function (req, res) {
  getDemoItemsService()
  .then((docs) => {
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
  })
  .catch((err) => {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error retriving ${item}s: ${err}`) );
  });
};

const createDemoItemController = function (req, res) {
  createDemoItemService(req)
  .then((doc) => {
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
  })
  .catch((err) => {
    res.status(500).json({
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error saving ${item}: ${err}`) );
  });
};

const getOneDemoItemController = function (req, res) {
  const id = req.params.demoId;
  getOneDemoItemService(id)
  .then((doc) => {
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
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Invalid ID',
      error: `${err}`,
    });
    console.log( chalk.redBright(`\nError retriving ${item}: ${err}\n`) );
  });
};

const deleteDemoItemController = function (req, res) {
  const id = req.params.demoId;
  deleteDemoItemService(id)
  .then(() => {
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
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error deleting ${item}`,
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error deleting ${item}: ${err}`) );
  });
};

const updateOneDemoItemPropertyValueController = function (req, res) {
  const id = req.params.demoId;
  updateOneDemoItemPropertyValueService(id, req.body)
  .then(() => {
    console.log( chalk.greenBright(`PATCH request for ID ${id} successful!`) );
    return res.status(200).json({
      message: 'Patch request successful!',
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error updating ${item} property & value`,
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error updating ${item} property & value: ${err}`) );
  });
};

const updateDemoItemPropertyValuesController = function (req, res) {
  const id = req.params.id;
  updateDemoItemPropertyValuesService(id, req.body)
  .then(() => {
    console.log( chalk.greenBright(`PUT request for ID ${id} successful!`) );
    return res.status(200).json({
      message: `Put request successful!`,
      request: {
        type: 'GET',
        description: `Url link to updated ${item}`,
        url: `http://localhost:3000/${routeName}/${id}`,
      },
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: `Error updating ${item}`,
      error: `${err}`,
    });
    console.log( chalk.redBright(`Error updating ${item}: ${err}`) );
  });
};

module.exports = {
  getDemoItemsController,
  createDemoItemController,
  getOneDemoItemController,
  deleteDemoItemController,
  updateOneDemoItemPropertyValueController,
  updateDemoItemPropertyValuesController,
};
