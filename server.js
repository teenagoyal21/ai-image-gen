const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/pexels', require('./src/routes/pexels'));
app.use('/api/chat', require('./src/routes/chat'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(' Error:', err);
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal Server Error' 
  });
});

const PORT = process.env.PORT || 3000;

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  app.listen(PORT, () => {
    console.log(` Server running on http://localhost:${PORT}`);
    console.log('PEXELS_API_KEY:', process.env.PEXELS_API_KEY ? 'Loaded' : ' Missing');
    console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Loaded' : ' Missing');
  });
}