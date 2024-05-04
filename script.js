// script.js

// Function to simulate image-to-image generation without an actual file upload
function generateImageToImage() {
    const prompt = document.getElementById('imageToImagePrompt').value;
    const formData = new FormData();

    // Simulated image data as a Base64 string
    const base64Image = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD...'; // Truncated for brevity

    // Convert Base64 string to a Blob
    const imageBlob = fetch(base64Image)
        .then(res => res.blob())
        .then(blob => {
            // Append the Blob to formData with a filename and content type
            formData.append('image', blob, {
                filename: 'test_image.jpg',
                contentType: 'image/jpeg'
            });
            formData.append('prompt', prompt);

            // Make the API request to the backend
            // Update the URL to the production backend service
            axios.post('https://alabasteropus.github.io/AIImageGenerator/generateImageToImage', formData)
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
