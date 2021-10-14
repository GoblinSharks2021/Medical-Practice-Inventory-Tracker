const colors = require('colors');
const express = require('express');
const router = express();

const supplierController = require('../controllers/supplierController');
const AppError = require('../../utils/AppError');

// routes for SUPPLIER TABLE
router.get('/', supplierController.getAllSuppliers, (req, res) =>
  res.status(200).json(res.locals.suppliers)
);

router.get('/:id', supplierController.getSupplierById, (req, res) => {
  res.status(200).json(res.locals.getSupplierById);
});

//check if user exists, if user exists,  do not add supplier because dupe
//not needed because should be handled by the constraints in sql server, defining id to be unique

router.post('/', supplierController.addNewSupplier, (req, res) =>
  res.status(200).json(res.locals.newSupplier)
);

router.put(
  '/:id',
  supplierController.getSupplierById,
  supplierController.updateSupplier,
  (req, res) => res.status(200).json(res.locals.updatedSupplier)
);

router.delete(
  '/:id',
  //running this check because the database inputs have no unique constraints CURRENTLY; Can delete after ALTER TABLE
  supplierController.getSupplierById,
  supplierController.deleteSupplier,
  (req, res) => res.status(200).json(res.locals.deletedSupplier)
);

module.exports = router;
