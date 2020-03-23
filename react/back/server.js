// ==============================================
const express = require('express');
const cors = require('cors');
const app = express();
// ==============================================
app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');
// ==============================================
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('food.db');
// ==============================================
// C:\dev\todo\react\back\time_series_19-covid-Confirmed.csv
const neatCsv = require('neat-csv');
const fs = require('fs')
app.get('/covid', (req, res) => {
  fs.readFile('./time_series_19-covid-Confirmed.csv', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(await neatCsv(data));
  })
});
// ==============================================
app.get('/josh', (req, res) => {

  db.all('SELECT * FROM food_table', (err, rows) => {
      console.log(rows);

      // Send data to front-end
      res.send({
        data: rows
      });
  });
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
// ==============================================
const port = 8888;
app.listen(port, () => console.log('http://localhost:8888'));
// ==============================================