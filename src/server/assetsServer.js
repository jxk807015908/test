const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

app.get('/3s.css', (req ,res, next) => {
  setTimeout(()=>{
    res.send(fs.readFileSync(path.resolve(__dirname, '../assets/test.css'), ''));
  }, 3000);
})
app.get('/4s.css', (req ,res, next) => {
  setTimeout(()=>{
    res.send(fs.readFileSync(path.resolve(__dirname, '../assets/test.css')));
  }, 4000);
})
app.get('/3s.js', (req ,res, next) => {
  setTimeout(()=>{
    res.send(fs.readFileSync(path.resolve(__dirname, '../assets/test.js')));
  }, 3000);
})
app.get('/4s.js', (req ,res, next) => {
  setTimeout(()=>{
    res.send(fs.readFileSync(path.resolve(__dirname, '../assets/test2.js')));
  }, 4000);
})

app.listen(5000);