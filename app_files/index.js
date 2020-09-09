const express = require('express');

const app = express();

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(8080, (req, res) => {
  console.log('Server started on port 8080');
});
