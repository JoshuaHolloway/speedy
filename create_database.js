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
  db.run("CREATE TABLE food_table (name TEXT, quantity INTEGER)");

  // insert 3 rows of data:
  db.run("INSERT INTO food_table VALUES ('apple', 0)");       // 1
  db.run("INSERT INTO food_table VALUES ('orange', 0)");      // 2
  db.run("INSERT INTO food_table VALUES ('banana', 0)");      // 3
  db.run("INSERT INTO food_table VALUES ('grapenuts', 0)");   // 4
  db.run("INSERT INTO food_table VALUES ('bread', 0)");       // 5
  db.run("INSERT INTO food_table VALUES ('egg-whole', 0)");   // 6
  db.run("INSERT INTO food_table VALUES ('egg-white', 0)");   // 7
  db.run("INSERT INTO food_table VALUES ('chicken', 0)");     // 8
  db.run("INSERT INTO food_table VALUES ('milk', 0)");        // 9
  db.run("INSERT INTO food_table VALUES ('strawbabies', 0)"); // 10

  console.log('successfully created the food_table table in food.db');

  // print them out to confirm their contents:
  db.each("SELECT name, quantity FROM food_table", (err, row) => {
      console.log(row.name + ": " + row.quantity);
  });
});

db.close();
