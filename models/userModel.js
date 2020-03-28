'use strict';
/*
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@metropolia.fi',
    password: '1234',
  },
  {
    id: '2',
    name: 'Jane Doez',
    email: 'jane@metropolia.fi',
    password: 'qwer',
  },
];

const getUser = (id) => {
  const user = users.filter((usr) => {
    if (usr.id === id) {
      return usr;
    }
  });
  return user[0];
};

const getUserLogin = (email) => {
  const user = users.filter((usr) => {
    if (usr.email === email) {
      return usr;
    }
  });
  return user[0];
};

*/

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('User', userSchema);

