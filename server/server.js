const express = require('express');
const path = require('path');
require('dotenv').config({ quiet: true });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Lightweight check for load balancers / uptime monitors
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
