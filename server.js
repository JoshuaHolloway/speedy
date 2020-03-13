//=======================================
const express = require('express');
const app = express();
//=======================================
app.use(express.static('static_files'));
//=======================================
const db = {
  // Key: Value
  philip: {
    // JS-Object
    //Key: Value
    job: 'prof',
    pet: 'cat.jpg'
  },
  josh: { job: 'dev', pet: 'dog.jpg' },
  steve: { job: 'eng', pet: 'bear.jpg' }
};
//=======================================
app.get('/users', (req, res) => {
  // Keys of db
  const db_keys = Object.keys(db);
  res.send(db_keys);
  //console.log('db_keys:');
  //console.log(db_keys);

  // Values of db
  const db_values = Object.values(db);
  //console.log('db_values:');
  //console.log(db_values);

  let jobs = new Array();
  let pets = new Array();
  for (let i = 0; i < db_values.length; ++i) {
    jobs[i] = db_values[i].job;
    pets[i] = db_values[i].pet;
  }
});
//=======================================
const port_num = 8888;
app.listen(port_num, () => console.log('http://localhost:8888') );