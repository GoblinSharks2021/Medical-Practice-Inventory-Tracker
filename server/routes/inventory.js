const colors = require('colors');
const express = require('express');
const router = express();

const inventoryController = require('../controllers/inventoryController');

// routes for INVENTORY TABLE
router.get('/', inventoryController.getAllInventory, (req, res) =>
  res.status(200).json(res.locals.inventory)
);

router.get('/:id', inventoryController.getInventoryById, (req, res) =>
  res.status(200).json(res.locals.inventoryById.row)
);

router.post('/', inventoryController.addNewInventory, (req, res) => {
  console.log(res.locals, 'LOCAL STORE'.zebra);
  //return undefined
  console.log(res.locals.inventory, 'NEW INVENTORY'.america);
  return res.status(200).json(res.locals.newInventory);
});

//DO WE NEED A PATCH
router.patch('/:id', inventoryController.updateInventory, (req, res) =>
  res.status(200).json(res.locals.updatedInventory)
);

router.delete('/:id', inventoryController.deleteInventory, (req, res) =>
  res.status(200).json(res.locals.deletedInventory)
);

module.exports = router;
