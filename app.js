const express = require('express');
const app = express();
const PORT = 3000;

// Routers
const user = require('./user/router.js');
const org = require('./org/router.js');
const task = require('./task/router.js');

// middlewares
const errorHandler = require('./middleware/errorHandling.js');
const notFoundEndpoint = require('./middleware/not-found-endpoint.js');

app.use(express.json()); 

// Routes
app.use("/user", user); 
app.use("/org", org); 
app.use("/task",task)

// Middleware to handle when the client hits non-existent endpoint 
app.all('/{*splat}',notFoundEndpoint);

// Global error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


