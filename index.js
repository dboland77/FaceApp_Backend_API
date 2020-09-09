const express = require("express");
const logger = require("./logger");

const app = express();


//Body Parser Middleware
app.use(express.json());

//Allow form submissions
app.use(express.urlencoded({extended:false}));

//Pull in our api
app.use('/api/members',require('./routes/api/members'));
const PORT = process.env.PORT || 3002;

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
