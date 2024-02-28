const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const meetings = require('./routes/meetings.js');

const app = express();

// Basic security protections
app.use(helmet());

// Enable CORS for all requests
app.use(cors());

// Logging HTTP requests
app.use(morgan('combined'));

// Parsing JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use(meetings);
    
// Joining a meeting someone else created

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
