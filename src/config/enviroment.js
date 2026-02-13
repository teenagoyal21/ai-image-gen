module.exports = {
  PEXELS_API_KEY: process.env.PEXELS_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  PORT: process.env.PORT || 3000,
  
  ENDPOINTS: {
    OPENAI_CHAT: 'https://api.openai.com/v1/chat/completions',
    OPENAI_IMAGES: 'https://api.openai.com/v1/images/generations',
    PEXELS_SEARCH: 'https://api.pexels.com/v1/search'
  },
  
  MODELS: {
    CHAT: 'gpt-4o-mini',
    IMAGE_GEN: 'dall-e-3'
  }
};