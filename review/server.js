// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const reviewRoutes = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/reviews', reviewRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
