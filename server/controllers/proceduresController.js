const colors = require('colors');

const pool = require('../models/inventoryModel');
const AppError = require('../../utils/AppError');

const proceduresController = {};

// add middleware
proceduresController.getAllProcedures = async (req, res, next) => {
  const allProceduresQuery = `SELECT procedures.procedure_name, procedures.procedure_desc, catalog.product_name, junction.qty_per_procedure FROM procedures 
        INNER JOIN junction ON procedures.procedure_id = junction.procedure_id
        INNER JOIN catalog ON catalog.product_id = junction.product_id`;
  try {
    const procedures = await pool.query(allProceduresQuery);
    res.locals.procedures = procedures.rows;
  } catch (err) {
    console.log('error querying for procedures --> ', err);
    next(err);
  }
  next();
};

proceduresController.addNewProcedure = async (req, res, next) => {
  try {
    const { procedure_id, procedure_name, procedure_desc } = req.body;
    const newProcedure = await pool.query(
      `INSERT INTO procedures (procedure_id, procedure_name, procedure_desc)
        VALUES ($1, $2, $3)`,
      [procedure_id, procedure_name, procedure_desc]
    );
    res.locals.newProcedure = newProcedure;
  } catch (err) {
    next(err);
  }
  next();
};

//@route       PUT api/procedures
//@desc         Update a single procedure's desc
//@access     Private
proceduresController.updateProcedure = async (req, res, next) => {
  const { procedure_name, procedure_desc } = req.body;
  //cannot update the product name because it is not a part of the pool
  // console.log(req.body, 'req.body'.rainbow);
  try {
    const updatedProcedure = await pool.query(
      'UPDATE procedures SET procedure_desc= $2 WHERE procedure_name=$1',
      [procedure_name, procedure_desc]
    );
    res.locals.updatedProcedure = updatedProcedure;
    return res.json(res.locals);
  } catch (e) {
    console.error(e.message);
    return next(e);
  }
};

// refactor this...
proceduresController.deleteProcedure = async (req, res, next) => {
  try {
    console.log('req body for deleteProcedure -->', req.body);
    const id = req.body[0];
    const deletedProcedure = await pool.query(
      `DELETE FROM procedure 
      WHERE procedure_id = $1`,
      [id]
    );
    res.locals.deletedProcedure = deletedProcedure;
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = proceduresController;
