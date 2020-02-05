const axios = require('axios');
const express = require('express');
const morgan = require('morgan');

const port = 3000;
let app = express();
app.use(morgan('dev'));
console.log(__dirname + '/../client')
app.use(express.static(__dirname + '/../client'));
app.use(express.json());

app.listen(port, function(){
console.log(`Coles PROXY server is listening on port ${port}`)
});