const express = require('express');
const app = express();

app.use(express.static('static_files'));

const port_num = 8888;
app.listen(port_num, () => console.log('http://localhost:8888') );