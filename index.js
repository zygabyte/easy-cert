const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const api = require('./routes');

// initializes the express app
const app = express();

// MIDDLEWARE
// for data posted
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// for registering root location for serving static files
app.use(express.static(path.join(__dirname, 'dist')));

// for handling cors
app.use(cors());

// Set routes
app.use('/api/user', api.user);
app.use('/api/exam', api.exam);
app.use('/api/training', api.training);
app.use('/api/test', api.test);
app.use('/api/dashboard', api.dashboard);
app.use('/api/community', api.community);

// END MIDDLEWARE


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on port ${PORT}`));