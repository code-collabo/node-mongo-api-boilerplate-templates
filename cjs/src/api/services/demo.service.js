
let Demo = require("../models/demo.model");

/*======================
  operations for /demo
=======================*/
const getDemoItemsService = () => {
  const query = Demo.find().select("_id name age").exec();
  return query;
}

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


module.exports = {
  getDemoItemsService,
  createDemoItemService,
  getOneDemoItemService,
  deleteDemoItemService,
};





// router.patch("/:demoId", (req, res, next) => {
//   const id = req.params.demoId;
//   const updateOps = {};
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value;
//   }
//   Demo.updateOne({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(() => {
//       console.log(
//         chalk.greenBright(
//           `\nPATCH request for ID ${id} successful! \n\nUpdated ${item} url: http://localhost:3000/${routeName}/${id}\n`
//         )
//       );
//       return res.status(200).json({
//         message: "Patch request successful!",
//         request: {
//           type: "GET",
//           description: `Url link to updated ${item}`,
//           url: `http://localhost:3000/${routeName}/${id}`,
//         },
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: `Error updating ${item} property & value`,
//         error: `${err}`,
//       });
//       console.log(
//         chalk.redBright(`\nError updating ${item} property & value: ${err}\n`)
//       );
//     });
// });

// router.put("/:id", (req, res) => {
//   let id = req.params.id;
//   let resetItem = {
//     name: req.body.name,
//     age: req.body.age,
//   };

//   Demo.findByIdAndUpdate(id, { $set: resetItem }, { new: true })
//     .exec()
//     .then((response) => {
//       console.log(
//         chalk.greenBright(
//           `\nPUT request for ID ${response._id} successful! \n\nUpdated ${item} url: http://localhost:3000/${routeName}/${id}\n`
//         )
//       );
//       return res.status(200).json({
//         message: `Put request successful!`,
//         request: {
//           type: "GET",
//           description: `Url link to updated ${item}`,
//           url: `http://localhost:3000/${routeName}/${id}`,
//         },
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: `Error updating ${item}`,
//         error: `${err}`,
//       });
//       console.log(chalk.redBright(`\nError updating ${item}: ${err}\n`));
//     });
// });
