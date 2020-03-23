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
app.get('/josh', (req, res) => {
  const x = {
    'josh': 0
  };
  res.send(x);
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