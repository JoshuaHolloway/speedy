//=======================================
const express = require('express');
const app = express();
//=======================================
app.use(express.static('public'));
//=======================================
app.set('view engine', 'ejs');
app.set('views', 'views');
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
// ==============================================
// POST request is for posting new data to the server
const body_parser = require('body-parser'); // Access the body of the post-request
app.use(body_parser.urlencoded({ extended: true })); // hook up with your app
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
            console.log('Insert SQL-query has been performed.');
        }
    );
});
// ==============================================
app.post('/update', (req, res) => {
  console.log('Inside /update route on server');

  const matrix = req.body.matrix; 
  const [num_rows, num_cols] = [matrix.length, matrix[0].length];

  // TODO: Perform the following in a single SQL-Query
  for (let col = 0; col < num_cols; ++col) {
    db.run(
      `UPDATE food_table SET quantity = ($quantity) WHERE name = ($name)`,
      {
        $name: matrix[0][col],
        $quantity: matrix[1][col]
      },
      err => {
        console.log(`[Col: ${col}] SQL-query has been performed.`);
      }
    );
  }
});
// ==============================================
app.get('/table', (req, res) => {
  res.render('table.ejs');
});
// ==============================================
app.get('/', (req, res) => {

  const date = new Date();
  
  res.render('index.ejs', {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay()
  });
});
//=======================================
const port_num = 8788;
app.listen(port_num, () => console.log('http://localhost:8788') );