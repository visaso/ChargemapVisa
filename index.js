'use strict';

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./database/db');
const cors = require('cors')
const http = require('http');
//const http = require('http').createServer(app);
//const https = require('https');
let options = {};


const fs = require('fs');

app.use(express.static('public'));


const passport = require('./utils/pass.js')
const graphqlHTTP = require('express-graphql');
const MyGraphQLSchema = require('./schema/schema');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
if (process.env.NODE_ENV === 'development') {
  const sslkey = fs.readFileSync('./ssl-key.pem');
  const sslcert = fs.readFileSync('./ssl-cert.pem')

  options = {
      key: sslkey,
      cert: sslcert
  };
  
}

const helmet = require('helmet');
app.use(helmet({
  ieNoOpen: false
}));


app.enable('trust proxy');

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

/*
db.on('connected', () => {
  app.listen(3000);
});
*/
/*
app.get('/', (req, res) => {
  res.send('Hello Secure World!');
});
*/

app.get('/', function(req, res){
  res.sendFile(__dirname + '/html/chat.html');
});


db.on('connected', () => {

  
  const https = require('https').createServer(options, app).listen(8000);
  //https.createServer(options, app).listen(8000);

const io = require('socket.io')(https);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

if (process.env.NODE_ENV === 'development') {
  http.createServer((req, res) => {
    res.writeHead(301, { 'Location': 'https://localhost:8000' + req.url });
    res.end();
}).listen(3000);
} else {
  http.createServer((req, res) => {
    res.redirect('https://' + req.headers.host + req.url);
    res.end();
}).listen(3000);
}

});



