const express = require("express");
const router = express.Router();

// Middlewares
const authenticateToken = require('../middleware/authentication.js');
const authorizeRole =require('../middleware/authorization.js');

// Controllers
const getAllTasks = require('./controller/get.js');
const createTask = require('./controller/create-task.js');
const { reassignTask, updateTaskstatus} = require('./controller/update.js');
const deleteTask = require('./controller/delete.js');

// User Authentication
router.use(authenticateToken);

// End points
router.get('/get-tasks', getAllTasks);

router.post('/create', authorizeRole(['Owner','Admin']), createTask);

router.put('/reassign', authorizeRole(['Owner','Admin']), reassignTask);
router.put('/taskstatus', updateTaskstatus);

router.delete('/delete-task', authorizeRole(['Owner','Admin']), deleteTask);

module.exports = router;