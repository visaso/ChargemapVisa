'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const cors = require('cors')

const passport = require('./utils/pass.js')
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  '/graphql',
  graphqlHTTP(async () => ({
    schema: MyGraphQLSchema,
    graphiql: true,
  }),
));


app.use('/auth', require('./routes/authRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/station', require('./routes/stationRoute'));
app.use('/connection', require('./routes/connectionRoute'));
app.use('/connectionType', require('./routes/connectionTypeRoute'));
app.use('/currentType', require('./routes/currentRoute'));
app.use('/level', require('./routes/levelRoute'));

db.on('connected', () => {
  app.listen(3000);
});
