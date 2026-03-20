// js/cat.js
document.addEventListener('DOMContentLoaded', () => {
  const getCatBtn = document.getElementById('get-cat');
  const resultDiv = document.getElementById('cat-result');
  const spinner = resultDiv.querySelector('.loading-spinner');
  const errorDiv = resultDiv.querySelector('.error-message');
  const imageContainer = resultDiv.querySelector('.image-container');
  const catImage = document.getElementById('cat-image');

  getCatBtn.addEventListener('click', fetchCat);

  async function fetchCat() {
    spinner.style.display = 'block';
    errorDiv.style.display = 'none';
    imageContainer.style.display = 'none';

    try {
      const response = await fetch('https://api.thecatapi.com/v1/images/search');
      if (!response.ok) throw new Error('Failed to fetch cat');
      const data = await response.json();
      const imageUrl = data[0].url;

      catImage.src = imageUrl;
      catImage.alt = 'Random cat';
      imageContainer.style.display = 'block';
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  // Load a cat immediately on page load
  fetchCat();
});