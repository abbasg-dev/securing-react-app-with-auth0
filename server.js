const express = require('express');
require('dotenv').config();

const app = express();

app.get('/public', function (req, res) {
  res.json({
    message: 'Hello from a public API!',
  });
});

app.listen(5173);
console.log('API server listening on ' + import.meta.env.VITE_AUTH0_AUDIENCE);
