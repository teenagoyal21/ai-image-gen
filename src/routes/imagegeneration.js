const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/enviroment');
const { handleApiError } = require('../utils/errorHandler');

router.post('/', async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    console.log('Image generation request:', prompt);
    
    const response = await axios.post(config.ENDPOINTS.OPENAI_IMAGES, {
      model: config.MODELS.IMAGE_GEN,
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard'
    }, {
      headers: { 
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Image generated successfully');
    res.json({ 
      imageUrl: response.data.data[0].url,
      revisedPrompt: response.data.data[0].revised_prompt
    });
  } catch (error) {
    handleApiError(error, 'Image generation');
  }
});

module.exports = router;