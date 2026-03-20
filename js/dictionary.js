// js/dictionary.js
document.addEventListener('DOMContentLoaded', () => {
  const wordInput = document.getElementById('word-input');
  const defineBtn = document.getElementById('define-btn');
  const resultDiv = document.getElementById('dict-result');
  const spinner = resultDiv.querySelector('.loading-spinner');
  const errorDiv = resultDiv.querySelector('.error-message');
  const contentDiv = resultDiv.querySelector('.definition-content');

  defineBtn.addEventListener('click', fetchDefinition);

  async function fetchDefinition() {
    const word = wordInput.value.trim();
    if (!word) {
      showError('Please enter a word');
      return;
    }

    spinner.style.display = 'block';
    errorDiv.style.display = 'none';
    contentDiv.style.display = 'none';
    contentDiv.innerHTML = '';

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!response.ok) {
        if (response.status === 404) throw new Error('Word not found');
        throw new Error('Failed to fetch definition');
      }
      const data = await response.json();
      displayDefinition(data[0]);
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  function displayDefinition(entry) {
    let html = `<h3>${entry.word}</h3>`;
    if (entry.phonetic) html += `<p class="phonetic">${entry.phonetic}</p>`;

    entry.meanings.forEach(meaning => {
      html += `<div class="definition-item">`;
      html += `<div class="part-of-speech">${meaning.partOfSpeech}</div>`;
      meaning.definitions.forEach((def, idx) => {
        html += `<div class="definition-text">${idx+1}. ${def.definition}</div>`;
        if (def.example) html += `<div class="example">“${def.example}”</div>`;
      });
      html += `</div>`;
    });

    contentDiv.innerHTML = html;
    contentDiv.style.display = 'block';
  }

  function showError(msg) {
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
    spinner.style.display = 'none';
  }

  wordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') fetchDefinition();
  });
});