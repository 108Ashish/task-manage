const routre = require('express').Router();
const authMiddleware = require('../middleware/authMiddleware');
const {register, login, logout, userDetails} = require('../services/user');

routre.post('/register', register);
routre.post('/login', login);
routre.post('/logout', logout);
routre.get('/userdetails',authMiddleware, userDetails);

module.exports = routre;