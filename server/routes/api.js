const express = require('express');
const router = express.Router();

// import routes
const homeController = require('../controllers/homeController');

router.use('/inventory', require('./inventory'));

router.use('/procedures', require('./procedures'));

// router.use('/catalog', require('./catalog'));

//CATALOG DOES NOT WORK WITH MVC PATTERN RIGHT NOW... MUST UPDATE
const catalogController = require('../controllers/catalogController');
router.use('/suppliers', require('./suppliers'));

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

module.exports = router;
