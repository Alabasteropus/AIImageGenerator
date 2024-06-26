const express = require('express');
const axios = require('axios');
const cors = require('cors');
const FormData = require('form-data');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 3000;

// Replace 'YOUR_API_KEY' with the actual API key
const API_KEY = process.env.STABILITY_AI_API_KEY;

// Middleware to parse JSON and form-data requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Multer setup for handling multipart/form-data (file uploads)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for text-to-image generation
app.post('/generateTextToImage', (req, res) => {
    const { prompt } = req.body;
    // Ensure the prompt is a string
    if (typeof prompt !== 'string') {
        console.error('Error: Prompt must be a string.');
        return res.status(400).send('Prompt must be a string.');
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const config = {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            ...formData.getHeaders()
        }
    };

    axios.post('https://api.stability.ai/v2beta/stable-image/generate/core', formData, config)
        .then(response => {
            // Send the base64 encoded string directly to the frontend
            res.send(response.data);
        })
        .catch(error => {
            let errorMessage = 'An unexpected error occurred.';
            let errorStatus = 500;

            if (error.response) {
                // Log the error status for internal tracking
                console.error('Error status:', error.response.status);
                errorMessage = 'An error occurred while generating the image.';
                errorStatus = error.response.status;
            } else if (error.request) {
                errorMessage = 'No response received from the image generation service.';
            } else {
                errorMessage = 'An error occurred in the request.';
            }
            res.status(errorStatus).send(errorMessage);
        });
});

// Endpoint for image-to-image generation
app.post('/generateImageToImage', upload.single('image'), (req, res) => {
    const { prompt } = req.body;
    // Ensure the prompt is a string
    if (typeof prompt !== 'string') {
        console.error('Error: Prompt must be a string.');
        return res.status(400).send('Prompt must be a string.');
    }

    const formData = new FormData();
    if (req.file) {
        // Ensure the file buffer is correctly received
        if (!(req.file.buffer instanceof Buffer)) {
            console.error('Error: Uploaded file is not a buffer.');
            return res.status(400).send('Uploaded file is not a buffer.');
        }
        formData.append('image', req.file.buffer, {
            filename: req.file.originalname,
            contentType: req.file.mimetype
        });
    } else {
        console.error('Error: No file uploaded.');
        return res.status(400).send('No file uploaded.');
    }
    formData.append('prompt', prompt);

    const config = {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            ...formData.getHeaders()
        }
    };

    axios.post('https://api.stability.ai/v2beta/stable-image/generate/core', formData, config)
        .then(response => {
            // Send the base64 encoded string directly to the frontend
            res.send(response.data);
        })
        .catch(error => {
            let errorMessage = 'An unexpected error occurred.';
            let errorStatus = 500;

            if (error.response) {
                // Log the error status for internal tracking
                console.error('Error status:', error.response.status);
                errorMessage = 'An error occurred while transforming the image.';
                errorStatus = error.response.status;
            } else if (error.request) {
                errorMessage = 'No response received from the image transformation service.';
            } else {
                errorMessage = 'An error occurred in the request.';
            }
            res.status(errorStatus).send(errorMessage);
        });
});

// Test endpoint for image-to-image generation using a predefined image file
app.post('/testGenerateImageToImage', (req, res) => {
    const { prompt } = req.body;
    const fs = require('fs');
    const path = require('path');

    // Ensure the prompt is a string
    if (typeof prompt !== 'string') {
        console.error('Error: Prompt must be a string.');
        return res.status(400).send('Prompt must be a string.');
    }

    const formData = new FormData();
    const imagePath = path.join(__dirname, 'sample_image.jpg');
    const imageBuffer = fs.readFileSync(imagePath);

    formData.append('image', imageBuffer, {
        filename: 'sample_image.jpg',
        contentType: 'image/jpeg'
    });
    formData.append('prompt', prompt);

    const config = {
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            ...formData.getHeaders()
        }
    };

    axios.post('https://api.stability.ai/v2beta/stable-image/generate/core', formData, config)
        .then(response => {
            // Send the base64 encoded string directly to the frontend
            res.send(response.data);
        })
        .catch(error => {
            console.error('Error in test image-to-image generation:', error.message);
            let errorMessage = 'An unexpected error occurred.';
            let errorStatus = 500;

            if (error.response) {
                console.error('Error data:', error.response.data);
                console.error('Error status:', error.response.status);
                console.error('Error headers:', error.response.headers);
                errorMessage = error.response.data.message || 'An error occurred during the test image transformation.';
                errorStatus = error.response.status;
            } else if (error.request) {
                console.error('Error request:', error.request);
                errorMessage = 'No response received from the test image transformation service.';
            } else {
                console.error('Error message:', error.message);
                errorMessage = error.message;
            }
            res.status(errorStatus).send(errorMessage);
        });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
