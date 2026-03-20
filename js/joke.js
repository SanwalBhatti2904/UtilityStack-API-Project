// js/joke.js
document.addEventListener('DOMContentLoaded', () => {
  const getJokeBtn = document.getElementById('get-joke');
  const resultDiv = document.getElementById('joke-result');
  const spinner = resultDiv.querySelector('.loading-spinner');
  const errorDiv = resultDiv.querySelector('.error-message');
  const contentDiv = resultDiv.querySelector('.joke-content');

  getJokeBtn.addEventListener('click', fetchJoke);

  async function fetchJoke() {
    spinner.style.display = 'block';
    errorDiv.style.display = 'none';
    contentDiv.style.display = 'none';

    try {
      // Request a single programming joke (type can be single or twopart)
      const response = await fetch('https://v2.jokeapi.dev/joke/Programming?safe-mode');
      if (!response.ok) throw new Error('Failed to fetch joke');
      const data = await response.json();

      if (data.type === 'single') {
        contentDiv.innerHTML = `<div class="joke-single">${data.joke}</div>`;
      } else {
        contentDiv.innerHTML = `
          <div class="joke-setup">${data.setup}</div>
          <div class="joke-delivery">${data.delivery}</div>
        `;
      }
      contentDiv.style.display = 'block';
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  // Load a joke immediately
  fetchJoke();
});