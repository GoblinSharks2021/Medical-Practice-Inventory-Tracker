const pool = require('../models/inventoryModel');

const supplierController = {};

//@route        GET api/suppliers/
//@desc         Get all suppliers
//@access     Private
supplierController.getAllSuppliers = async (req, res, next) => {
  try {
    // console.log("Supplier Controller....")
    const suppliers = await pool.query('SELECT * FROM suppliers');
    res.locals.suppliers = suppliers.rows;
  } catch (err) {
    next(err);
  }
  next();
};

//@route        GET api/suppliers/:id
//@desc         Get select supplier
//@access     Private
supplierController.getSupplierById = async (req, res, next) => {
  try {
    const id = req.body;
    const supplierById = await pool.query(
      'SELECT * FROM suppliers WHERE supplier_id = $1',
      [id]
    );
    res.locals.supplierById = supplierById.row;
  } catch (err) {
    console.error(err.message);
    next(err);
  }
  next();
};

//@route        POST api/suppliers/
//@desc         Post a new supplier
//@access     Private
//ALTER TABLE to make supplier phone num unique so no dupes
supplierController.addNewSupplier = async (req, res, next) => {
  try {
    console.log(req.body);
    const {
      supplier_name,
      key_contact,
      supplier_phone_number,
      supplier_address
    } = req.body;
    const newSupplier = await pool.query(
      'INSERT INTO suppliers (supplier_name, key_contact, supplier_phone_number, supplier_address) VALUES($1, $2, $3, $4) RETURNING *',
      [supplier_name, key_contact, supplier_phone_number, supplier_address]
    );
    res.locals.newSupplier = newSupplier;
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

supplierController.updateSupplier = async (req, res, next) => {
  try {
    // console.log(req.body)
    const id = req.body.supplier_id;

    const {
      supplier_name,
      key_contact,
      supplier_phone_number,
      supplier_address
    } = req.body;

    const updatedSupplier = await pool.query(
      'UPDATE suppliers SET supplier_name = $1, key_contact = $2, supplier_phone_number = $3, supplier_address = $4 WHERE supplier_id = $5',
      [supplier_name, key_contact, supplier_phone_number, supplier_address, id]
    );
    res.locals.updatedSupplier = updatedSupplier;
  } catch (err) {
    console.error(err.message);
    next(err);
  }

  next();
};

//@route        DELETE api/suppliers/:id
//@desc         Get all users
//@access     Private
//On delete SET NULL in table
supplierController.deleteSupplier = async (req, res, next) => {
  try {
    console.log(req.body);
    const id = req.body.supplier_id;
    const deletedSupplier = await pool.query(
      'DELETE FROM suppliers WHERE supplier_id = $1',
      [id]
    );
    res.locals.deletedSupplier = deletedSupplier;
  } catch (err) {
    console.log(err);
    next(err);
  }
  next();
};

module.exports = supplierController;
