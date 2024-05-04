// script.js

// Function to handle text-to-image generation
function generateTextToImage() {
    console.log('generateTextToImage function called'); // Added for debugging
    const prompt = document.getElementById('textToImagePrompt').value;
    console.log('Sending text-to-image request with prompt:', prompt); // Added for debugging
    axios.post('https://decoded-pilot-421603.uc.r.appspot.com/generateTextToImage', {
        prompt: prompt
    }).then(response => {
        console.log('Text-to-image response received:', response); // Added for debugging
        if (response.data && response.data.image) {
            const imageSrc = `data:image/jpeg;base64,${response.data.image}`;
            document.getElementById('textToImageResult').src = imageSrc;
            document.getElementById('textToImageResult').hidden = false;
        } else {
            console.error('Unexpected API response format:', response);
        }
    }).catch(error => {
        console.error('Error in generateTextToImage:', error);
        console.error('Error details:', error.response ? error.response : error);
        alert('An error occurred while generating the image. Please check the console for more details.');
    });
}

// Function to handle image-to-image generation with actual file upload
function generateImageToImage() {
    console.log('generateImageToImage function called'); // Added for debugging
    const file = document.getElementById('imageToImageFile').files[0];
    const prompt = document.getElementById('imageToImagePrompt').value;
    console.log('Sending image-to-image request with file and prompt:', file, prompt); // Added for debugging
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);

    // Make the API request to the backend
    // Update the URL to the production backend service
    axios.post('https://decoded-pilot-421603.uc.r.appspot.com/generateImageToImage', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {
        console.log('Image-to-image response received:', response); // Added for debugging
        // Check if response.data contains the property 'image'
        if (response.data && response.data.image) {
            const imageSrc = `data:image/jpeg;base64,${response.data.image}`;
            document.getElementById('imageToImageResult').src = imageSrc;
            document.getElementById('imageToImageResult').hidden = false;
        } else {
            // If response.data does not contain 'image', log the entire response
            console.error('Unexpected API response format:', response);
        }
    }).catch(error => {
        console.error('Error in generateImageToImage:', error);
        console.error('Error details:', error.response ? error.response : error);
        alert('An error occurred while transforming the image. Please check the console for more details.');
    });
}

// Ensure the functions are attached to the window object after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    window.generateTextToImage = generateTextToImage;
    window.generateImageToImage = generateImageToImage;
});

// Debugging: Log the base64 image data to ensure it's correct
function logBase64Image(imageElementId) {
    const imageElement = document.getElementById(imageElementId);
    if (imageElement) {
        console.log(`Image Data for ${imageElementId}:`, imageElement.src);
    } else {
        console.error(`Image element with ID ${imageElementId} not found`);
    }
}

// Attach the debugging function to the window object
document.addEventListener('DOMContentLoaded', (event) => {
    window.logBase64Image = logBase64Image;
});
