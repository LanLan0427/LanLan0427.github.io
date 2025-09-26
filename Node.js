const express = require('express');
const app = express();
let lastNotify = null;

app.use(express.json());

app.post('/notify', (req, res) => {
  lastNotify = new Date();
  res.sendStatus(200);
});

app.get('/status', (req, res) => {
  res.json({ lastNotify });
});

app.listen(3000, () => console.log('Server running'));