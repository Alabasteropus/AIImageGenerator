const axios = require('axios');
const FormData = require('form-data');

// Replace 'YOUR_API_KEY' with the actual API key
const API_KEY = 'sk-3cZP3kYRK6XWLxMO81GN5BfDJzV48dIOR1i7QV6GHJ9iXrHu';

const formData = new FormData();
formData.append('prompt', 'A futuristic city skyline at sunset');

const config = {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    ...formData.getHeaders()
  }
};

axios.post('https://api.stability.ai/v2beta/stable-image/generate/core', formData, config)
  .then(response => {
    console.log(JSON.stringify(response.data, null, 2));
  })
  .catch(error => {
    console.error('API call failed:', error);
  });
