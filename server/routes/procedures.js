const colors = require('colors');
const express = require('express');
const router = express();

const proceduresController = require('../controllers/proceduresController');

// routes for PROCEDURES TABLE
router.get('/', proceduresController.getAllProcedures, (req, res) =>
  res.status(200).json(res.locals.procedures)
);

router.post('/', proceduresController.addNewProcedure, (req, res) =>
  res.status(204).json(res.locals.newProcedure)
);

router.put('/', proceduresController.updateProcedure, (req, res) => {
  res.status(200).json({ msg: 'procedure updated' });
});

router.delete('/:id', proceduresController.deleteProcedure, (req, res) =>
  res.status(200).json(res.locals.deleteProcedure)
);

module.exports = router;
