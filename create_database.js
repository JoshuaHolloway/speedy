// Node.js + Express server backend for proteinsapp
// v2 - use SQLite (https://www.sqlite.org/index.html) as a database
//
// COGS121 by Philip Guo
// https://github.com/pgbovine/COGS121

// run this once to create the initial database as the proteins.db file
//   node create_database.js

// to clear the database, simply delete the proteins.db file:
//   rm proteins.db

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('food.db');

// run each database statement *serially* one after another
// (if you don't do this, then all statements will run in parallel,
//  which we don't want)
db.serialize(() => {
  // create a new database table:
  db.run("CREATE TABLE food_table (name TEXT, cals INTEGER, protein TEXT)");

  // insert 3 rows of data:
  db.run("INSERT INTO food_table VALUES ('Apple', 10, '15')");
  db.run("INSERT INTO food_table VALUES ('Orange', 20, '25')");
  db.run("INSERT INTO food_table VALUES ('Banana', 30, '35')");

  console.log('successfully created the food_table table in food.db');

  // print them out to confirm their contents:
  db.each("SELECT name, cals, protein FROM food_table", (err, row) => {
      console.log(row.name + ": " + row.cals + ' - ' + row.protein);
  });
});

db.close();
