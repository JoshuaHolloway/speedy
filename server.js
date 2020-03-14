//=======================================
const express = require('express');
const app = express();
//=======================================
app.use(express.static('static_files'));
//=======================================
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('food.db');
//=======================================
app.get('/foods', (req, res) => {
    db.all('SELECT * FROM food_table', (err, rows) => {
        console.log(rows);

        // Send data to front-end
        res.send(rows);
    });
});
//=======================================
app.get('/users', (req, res) => {
  //const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  db.all('SELECT name FROM food_table', (err, rows) => {
    // -run this SQL query and then after it is done run this callback
    console.log(rows);
    const all_user_names = rows.map(e => e.name);
    console.log(all_user_names);
    res.send(all_user_names);
  });
});
// ==============================================
// POST request is for posting new data to the server
const body_parser = require('body-parser'); // Access the body of the post-request
app.use(body_parser.urlencoded({ extended: true })); // hook up with your app
// ==============================================
app.post('/users', (req, res) => {
  console.log('Inside app.post(/users) for POST ', req.body);

  // db.run() ececutes an SQL-query and then runs a callback
  // -It does not return any data,
  //  whereas db.all() returns data.
  db.run(
    // Arg-1: SQL-query
    'INSERT INTO food_table VALUES ($name, $cals, $protein)',
    // Arg-2: Values for args in SQL-query
    {
      $name: req.body.name,
      $job: req.body.job,
      $pet: req.body.pet
    },
    // Arg-3: Callback to run after SQL-query
    err => {
      if (err) {
        res.send({ message: 'error in app.post(/users)' });
      } else {
        res.send({ message: 'successfully run app.post(/users)' });
      }
    }
  );
});
// ==============================================
app.post('/insert', (req, res) => {
    console.log('inside /insert via post-request');

    db.run(
        
        // Arg-1: SQL-query
        'INSERT INTO food_table VALUES ($name, $quantity)',
        
        // Arg-2: Values for args in SQL-query
        {
            $name: req.body.name,
            $quantity: req.body.quantity
        },

        // Arg-3: Callback to run after SQL-query
        err => {
            console.log('sql-query has been performed sucka!');
        }
    );
});
// ==============================================
app.post('/update', (req, res) => {
  console.log('Inside /update route on server');

  const matrix = req.body.matrix;
  console.log(matrix);

  // TODO: grap row and col and update that exact one

  // First-col
  db.run(
    `UPDATE food_table SET quantity = ($quantity) WHERE name = ($name)`,
    {
      $name: matrix[0][0],
      $quantity: matrix[1][0]
    },
    err => {
      console.log('[1st Col] sql-query has been performed sucker!');
    }
  );

  // Second-col
  db.run(
    `UPDATE food_table SET quantity = ($quantity) WHERE name = ($name)`,
    {
      $name: matrix[0][1],
      $quantity: matrix[1][1]
    },
    err => {
      console.log('[2nd Col] sql-query has been performed sucker!');
    }
  );

  // Third-col
  db.run(
    `UPDATE food_table SET quantity = ($quantity) WHERE name = ($name)`,
    {
      $name: matrix[0][2],
      $quantity: matrix[1][2]
    },
    err => {
      console.log('[3rd Col] sql-query has been performed sucker!');
    }
  );

});

// ==============================================
// GET profile data for a user
app.get('/users/:userid', (req, res) => {
  const nameToLookup = req.params.userid; // matches ':userid' above

  db.all(
    // Arg-1: SQL-query
    'SELECT * FROM food_table WHERE name=$name',

    // Arg-2: Object that contains the mapping for $name
    {
      $name: nameToLookup
    },

    // Arg-3: Callback function to run when the query finishes
    (err, rows) => {
      console.log('Query has finished');
      console.log(rows);
      if (rows.length > 0) {
        //res.send(rows);
        res.send(rows[0]); // Array only has one element (the row)
      } else {
        res.send({}); // failed, so return an empty object instead of undefined
      }
    }
  );

  //const val = fakeDatabase[nameToLookup];
  //console.log(nameToLookup, '->', val); // for debugging
  // if (val) {
  //   res.send(val);
  // } else {
  //   res.send({}); // failed, so return an empty object instead of undefined
  // }
});
//=======================================
const port_num = 8888;
app.listen(port_num, () => console.log('http://localhost:8888') );