// Simulated data structure for images and tags, assuming real data would be fetched or stored
const images = [
  { filename: 'coleoptera.jpg', tag: 'Coleoptera' },
  { filename: 'odonata.jpg', tag: 'Odonata' },
  { filename: 'diptera.png', tag: 'Diptera' },
  { filename: 'orthoptera.jpg', tag: 'Orthoptera'}
  // Add more images and tags as needed
];

let score = 0; // Track correct answers

document.addEventListener('DOMContentLoaded', () => {
  generateQuestion();
});

function generateQuestion() {
  // Randomly select two distinct images
  const selectedImages = selectRandomImages(images, 2);
  // Randomly decide which image's tag to use in the question
  const questionImage = selectedImages[Math.floor(Math.random() * selectedImages.length)];
  const tag = questionImage.tag;

  // Pass the tag directly as an argument to displayQuestion
  displayQuestion(`Click on the member of the ${tag} family`, selectedImages, tag);
}

function selectRandomImages(imagesArray, count) {
  let shuffled = [...imagesArray].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function displayQuestion(questionText, images, correctTag) {
  const questionElement = document.getElementById('question');
  const imagesContainer = document.getElementById('images-container');
  const scoreElement = document.getElementById('score');

  // Update question text
  questionElement.textContent = questionText;

  // Clear previous images
  imagesContainer.innerHTML = '';

  // Display images and set click handlers
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = `./bugpics/${image.filename}`;
    imgElement.alt = 'bug image';

    // Set the size of the image
    imgElement.style.width = '512px';
    imgElement.style.height = '512px';

    imgElement.addEventListener('click', () => handleImageClick(image.tag, correctTag));
    imagesContainer.appendChild(imgElement);
  });

  // Update score display
  scoreElement.textContent = `Score: ${score}`;
}

function handleImageClick(clickedTag, correctTag) {
  if (clickedTag === correctTag) {
    alert('Correct! [A random fact about the order will be included here.]');
    score++;
  } else {
    alert('Incorrect, try again!');
  }
  generateQuestion();
}
