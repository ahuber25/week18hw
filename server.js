const express = require('express');
const routes = require('./routes');
const db = require('./config/connections')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));
