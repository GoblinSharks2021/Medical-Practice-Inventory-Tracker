const { Pool } = require("pg");

const PG_URI =
  "postgres://sowqmvmc:C8VcOF5uXm7v7Utsy-wL7WEor3YPR-Tq@fanny.db.elephantsql.com/sowqmvmc"

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
})

module.exports = {
  query: (text, params, callback) => {
    console.log("executed query", text)
    return pool.query(text, params, callback)
  },
}
