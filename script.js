// script.js

function generateTextToImage() {
    const prompt = document.getElementById('textToImagePrompt').value;
    const data = { prompt: prompt };

    axios.post('http://localhost:3000/generateTextToImage', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('API response:', response); // Updated for debugging
        // Check if response.data contains the property 'image'
        if (response.data && response.data.image) {
            const imageSrc = `data:image/jpeg;base64,${response.data.image}`;
            document.getElementById('textToImageResult').src = imageSrc;
            document.getElementById('textToImageResult').hidden = false;
        } else {
            // If response.data does not contain 'image', log the entire response
            console.error('Unexpected API response format:', response);
        }
    }).catch(error => {
        console.error('Error:', error);
        alert('An error occurred while generating the image.');
    });
}

function generateImageToImage() {
    const file = document.getElementById('imageToImageFile').files[0];
    const prompt = document.getElementById('imageToImagePrompt').value;
    const formData = new FormData();
    formData.append('image', file);
    formData.append('prompt', prompt);

    axios.post('http://localhost:3000/generateImageToImage', formData)
    .then(response => {
        console.log('API response:', response); // Updated for debugging
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
        console.error('Error:', error);
        alert('An error occurred while transforming the image.');
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
