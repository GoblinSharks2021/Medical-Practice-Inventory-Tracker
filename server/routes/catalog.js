const colors = require('colors');
const express = require('express');
const router = express();

const catalogController = require('../controllers/catalogController');
const AppError = require('../../utils/AppError');

// routes for CATALOG TABLE

// @route        GET all api/products
// @desc         Get all products
// @access     Private
router.get('/', catalogController.getAllProducts, (req, res) => {
  console.log(req.params, 'req'.bgCyan);
  console.log('res.locals'.bgRed, res.locals);
  return res.status(200).json(res.locals.products);
});

// router.get('/lowstock', catalogController.lowStock, (req, res) =>
//   res.status(200).json(res.locals.lowStock)
// );

//do we need to grab a get at an id?

// @route        POST all api/products
// @desc         Create a new product
// @access     Private
router.post('/', catalogController.addNewProduct, (req, res) =>
  res.status(200).json(res.locals.newProduct)
);

//No patch??Needed?

// @route        DELETE one api/products
// @desc         Delete a product
// @access     Private
router.delete('/:id', catalogController.deleteProduct, (req, res) =>
  res.status(200).json(res.locals.deletedProduct)
);

module.exports = router;
