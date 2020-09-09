const express = require("express");
const logger = require("./logger");

const app = express();

app.use('/api/members',require('./routes/api/members'));

const PORT = process.env.PORT || 3002;

// Start server
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
