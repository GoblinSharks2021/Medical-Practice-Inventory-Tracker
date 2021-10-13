const express = require('express');
const router = express.Router();

// import routes
const homeController = require('../controllers/homeController');

router.use('/inventory', require('./inventory'));

router.use('/procedures', require('./procedures'));
// const proceduresController = require('../controllers/proceduresController');
const catalogController = require('../controllers/catalogController');
const supplierController = require('../controllers/supplierController');

function testFunction(req, res, next) {
  console.log(res.locals.procedureDetails);
  next();
}

// routes for HOME display
router.get('/home', homeController.viewProcedureDetails, (req, res) =>
  res.status(200).json(res.locals.procedureDetails)
);

router.get('/home', homeController.viewInventoryPercentages, (req, res) =>
  res.status(200).json(res.locals.stockPercent)
);

// // routes for PROCEDURES TABLE
// router.get('/procedures', proceduresController.getAllProcedures, (req, res) =>
//   res.status(200).json(res.locals.procedures)
// );

// router.post('/procedures', proceduresController.addNewProcedure, (req, res) =>
//   res.status(200).json(res.locals.newProcedure)
// );

// router.delete('/procedures', proceduresController.deleteProcedure, (req, res) =>
//   res.status(200).json(res.locals.deleteProcedure)
// );

// routes for CATALOG TABLE
router.get('/catalog', catalogController.getAllProducts, (req, res) =>
  res.status(200).json(res.locals.products)
);

router.get('/lowstock', catalogController.lowStock, (req, res) =>
  res.status(200).json(res.locals.lowStock)
);

router.post('/catalog', catalogController.addNewProduct, (req, res) =>
  res.status(200).json(res.locals.newProduct)
);

router.delete('/catalog', catalogController.deleteProduct, (req, res) =>
  res.status(200).json(res.locals.deletedProduct)
);

// routes for SUPPLIER TABLE
router.get('/suppliers', supplierController.getAllSuppliers, (req, res) =>
  res.status(200).json(res.locals.suppliers)
);

router.get('/suppliers', supplierController.getSupplierById, (req, res) =>
  res.status(200).json(res.locals.getSupplierById.row)
);

router.post('/suppliers', supplierController.addNewSupplier, (req, res) =>
  res.status(200).json(res.locals.newSupplier)
);

router.put('/suppliers', supplierController.updateSupplier, (req, res) =>
  res.status(200).json(res.locals.updatedSupplier)
);

router.delete('/suppliers', supplierController.deleteSupplier, (req, res) =>
  res.status(200).json(res.locals.deletedSupplier)
);

module.exports = router;
