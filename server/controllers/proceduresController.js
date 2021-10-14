const pool = require('../models/inventoryModel');

const proceduresController = {};

//@route        GET api/procedures/
//@desc         Get all procedures
//@access     Private
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

//@route        POST api/procedures
//@desc         Post a new procedure
//@access     Private
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

//@route       DELETE api/procedures
//@desc         Delete a single procedure
//@access     Private

//DELETE ON CASCADE from CATALOG
//changing id to req.params but keep in mind, the ids are serialized in db
proceduresController.deleteProcedure = async (req, res, next) => {
  const { id } = req.params;
  try {
    console.log('req body for deleteProcedure -->', req.body);
    const id = req.body[0];
    const deletedProcedure = await pool.query(
      `DELETE FROM procedure 
      WHERE procedure_id = $1`,
      [id]
    );
    // console.log(deletedProcedure, 'deleteProcedure'.bgMagenta);
    res.locals.deletedProcedure = deletedProcedure;
  } catch (err) {
    next(err);
  }
  next();
};

module.exports = proceduresController;
