//=======================================
const express = require('express');
const app = express();
//=======================================
app.use(express.static('static_files'));
//=======================================
// const db = {
//   // Key: Value
//   philip: {
//     // JS-Object
//     //Key: Value
//     job: 'prof',
//     pet: 'cat.jpg'
//   },
//   josh: { job: 'dev', pet: 'dog.jpg' },
//   steve: { job: 'eng', pet: 'bear.jpg' }
// };
const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('pets.db');
//=======================================
app.get('/users', (req, res) => {
  //const allUsernames = Object.keys(fakeDatabase); // returns a list of object keys
  db.all('SELECT name FROM users_to_pets', (err, rows) => {
    // -run this SQL query and then after it is done run this callback
    console.log(rows);
    const all_user_names = rows.map(e => e.name);
    console.log(all_user_names);
    res.send(all_user_names);
  });
});
// app.get('/users', (req, res) => {
//   // Keys of db
//   const db_keys = Object.keys(db);
//   res.send(db_keys);
//   //console.log('db_keys:');
//   //console.log(db_keys);

//   // Values of db
//   const db_values = Object.values(db);
//   //console.log('db_values:');
//   //console.log(db_values);

//   let jobs = new Array();
//   let pets = new Array();
//   for (let i = 0; i < db_values.length; ++i) {
//     jobs[i] = db_values[i].job;
//     pets[i] = db_values[i].pet;
//   }
// });
//=======================================
const port_num = 8888;
app.listen(port_num, () => console.log('http://localhost:8888') );