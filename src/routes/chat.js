const express = require('express');
const axios = require('axios');
const router = express.Router();
const config = require('../config/enviroment');
const { handleApiError } = require('../utils/errorHandler');

router.post('/', async (req, res, next) => {
  try {
    const { message, imageBase64 } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Chat request received');
    
    const response = await axios.post(config.ENDPOINTS.OPENAI_CHAT, {
      model: config.MODELS.CHAT,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: message },
            ...(imageBase64 ? [{
              type: 'image_url',
              image_url: { url: imageBase64 }
            }] : [])
          ]
        }
      ],
      max_tokens: 1024
    }, {
      headers: { 
        'Authorization': `Bearer ${config.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('OpenAI response received');
    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    handleApiError(error, 'Chat');
  }
});

module.exports = router;