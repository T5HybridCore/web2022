const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const router = require('./api/controllers/firebase_controllers');

// API Port
const port = process.env.PORT || 3050;

// App
const app = express();

// Setup App
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(compression());

// Routes
app.use('/api', router);

// Listener
app.listen(port, function () {
    console.log(`API running on: http://localhost:${port}`);
});