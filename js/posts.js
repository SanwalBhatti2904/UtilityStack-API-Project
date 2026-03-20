// js/posts.js – now with real English sentences
document.addEventListener('DOMContentLoaded', () => {
  const loadBtn = document.getElementById('load-posts');
  const container = document.getElementById('posts-container');
  const spinner = container.querySelector('.loading-spinner');
  const errorDiv = container.querySelector('.error-message');

  // A collection of readable English sentences (you can add more)
  const englishSentences = [
    "The sun set behind the mountains, painting the sky in shades of orange and pink.",
    "She decided to learn JavaScript after years of working as a designer.",
    "The new café in town serves the best cappuccino with a hint of cinnamon.",
    "Tomorrow's weather forecast predicts scattered showers and cool breezes.",
    "He finally finished reading that 800‑page novel he started last summer.",
    "The team worked late into the night to meet the project deadline.",
    "Cats can make wonderful companions, especially when you work from home.",
    "The museum's new exhibition features contemporary artists from around the world.",
    "She planted a small herb garden on her balcony – basil, mint, and rosemary.",
    "The old library downtown is being renovated and will reopen in June.",
    "Learning to play the guitar takes patience, but it's incredibly rewarding.",
    "The train arrived exactly on time, which was a pleasant surprise.",
    "He sent a postcard from every city he visited during his backpacking trip.",
    "The recipe called for ingredients she had never heard of before.",
    "A gentle rain started falling, tapping softly against the window pane."
  ];

  // A collection of realistic titles (optional – if you want to replace titles too)
  const englishTitles = [
    "A Beautiful Sunset",
    "Learning JavaScript",
    "Local Café Review",
    "Weekend Weather Update",
    "Book Recommendation",
    "Project Milestone",
    "Why Cats Are Great",
    "Art Exhibition Opening",
    "Gardening Tips",
    "Library Renovation News",
    "Guitar Lessons",
    "Train Travel",
    "Postcards from Abroad",
    "Cooking Experiment",
    "Rainy Day Thoughts"
  ];

  let allPosts = [];

  async function fetchAllPosts() {
    spinner.style.display = 'block';
    errorDiv.style.display = 'none';
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      if (!response.ok) throw new Error('Failed to load posts');
      const posts = await response.json();

      // Replace dummy text with English sentences
      allPosts = posts.map((post, index) => ({
        ...post,
        // Use a random sentence each time, but ensure some variation
        body: englishSentences[Math.floor(Math.random() * englishSentences.length)],
        // Optionally replace title (comment out if you want to keep original titles)
        title: englishTitles[Math.floor(Math.random() * englishTitles.length)]
      }));

      displayRandomPosts(5);
    } catch (err) {
      errorDiv.textContent = err.message;
      errorDiv.style.display = 'block';
    } finally {
      spinner.style.display = 'none';
    }
  }

  function displayRandomPosts(count = 5) {
    // Remove any previously shown posts
    const existingPosts = container.querySelectorAll('.post-item');
    existingPosts.forEach(el => el.remove());

    if (!allPosts.length) return;

    // Shuffle and pick random posts
    const shuffled = [...allPosts].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);

    selected.forEach(post => {
      const postEl = document.createElement('div');
      postEl.className = 'post-item';
      postEl.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <small>Post ID: ${post.id}</small>
      `;
      container.appendChild(postEl);
    });
  }

  loadBtn.addEventListener('click', () => {
    if (allPosts.length) {
      displayRandomPosts(5);
    } else {
      fetchAllPosts();
    }
  });

  fetchAllPosts();
});