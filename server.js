const express = require('express');
const app = express();

app.use(express.static(__dirname + '/src'));

app.listen('3000');
console.log('Test app running on http://localhost:3000');