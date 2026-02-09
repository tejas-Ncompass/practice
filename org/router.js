const express = require("express");
const router = express.Router();

// Middlewares
const authenticateToken = require('../middleware/authentication.js');
const authorizeRole =require('../middleware/authorization.js');

// Controllers
const { getAllOrgs, getAllUsers } = require("./controller/get-org.js");
const createOrg = require('./controller/create-org.js');
const addUsers = require('./controller/add-users.js');
const deleteOrg = require('./controller/delete-org.js');

// User Authentication
router.use(authenticateToken);

// Endpoints
router.get('/get-org',getAllOrgs); 
router.get('/get-users', getAllUsers);

router.post('/create-org', createOrg);  
router.post('/add-emp/:orgId', authorizeRole(['Owner','Admin']), addUsers);    

router.delete('/delete-org', deleteOrg);

module.exports = router;