const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', 'views');

app.get('/', (req, res) => {

  const date = new Date();
  
  res.render('index.ejs', {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
    day: date.getDay()
  });
});

const port = 8888;
app.listen(port, () => console.log('http://localhost:8888'));