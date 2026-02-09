const express = require("express");
const router = express.Router();

// Middlewares
const authenticateToken = require('../middleware/authentication.js');
const authorizeRole =require('../middleware/authorization.js');
const validate= require('../middleware/validator.js');

// Validation Schema for users
const userSchema =require('./validation/userSchema.js');

// Controllers
const signup = require('./controller/signup.js');
const login = require('./controller/login.js');
const getAllUsers = require('./controller/get-user.js');
const deleteUser = require('./controller/delete-user.js');
const updateUser = require('./controller/update-user.js');

// End points
router.post('/signup', signup);
router.post('/login', login);

// User Authentication
router.use(authenticateToken);

router.get('/get-users', getAllUsers);

router.put('/update-user', authorizeRole(['Admin','Manager']), validate(userSchema), updateUser);

router.delete('/delete-user', authorizeRole(['Admin','Manager']), deleteUser);

module.exports = router;