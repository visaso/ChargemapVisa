'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/station', require('./routes/stationRoute'));
app.use('/connection', require('./routes/connectionRoute'));
app.use('/connectionType', require('./routes/connectionTypeRoute'));
app.use('/currentType', require('./routes/currentRoute'));
app.use('/level', require('./routes/levelRoute'));

db.on('connected', () => {
  app.listen(3000);
});
