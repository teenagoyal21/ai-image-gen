const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/enviroment');
const { handleApiError } = require('../utils/errorHandler');

router.get('/search', async (req, res, next) => {
  try {
    const { query, per_page = 15 } = req.query;
    
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    console.log('🔍 Pexels search:', query);
    
    const response = await axios.get(config.ENDPOINTS.PEXELS_SEARCH, {
      headers: { 'Authorization': config.PEXELS_API_KEY },
      params: { query, per_page }
    });
    
    res.json(response.data);
  } catch (error) {
    handleApiError(error, 'Pexels search');
  }
});

module.exports = router;