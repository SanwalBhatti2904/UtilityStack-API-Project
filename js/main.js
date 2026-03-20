// js/main.js
(function () {
  // ==================== THEME TOGGLE ====================
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  // ==================== MOBILE MENU TOGGLE ====================
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const nav = document.querySelector('.main-nav');
  if (mobileBtn && nav) {
    mobileBtn.addEventListener('click', () => {
      nav.classList.toggle('show');
    });
  }

  // ==================== SEARCH WITH SOURCE SELECTION ====================
  const searchForm = document.getElementById('search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const query = document.getElementById('search-input').value.trim();
      const source = document.getElementById('search-source').value; // 'site' or 'wikipedia'

      if (!query) return; // ignore empty search

      if (source === 'site') {
        // ----- SITE SEARCH (internal feature mapping) -----
        const featureMap = {
          weather: 'pages/weather.html',
          cat: 'pages/cat.html',
          cats: 'pages/cat.html',
          dictionary: 'pages/dictionary.html',
          define: 'pages/dictionary.html',
          joke: 'pages/joke.html',
          jokes: 'pages/joke.html',
          currency: 'pages/currency.html',
          money: 'pages/currency.html',
          posts: 'pages/posts.html',
          blog: 'pages/posts.html',
          contact: 'pages/contact.html',
          services: 'pages/services.html',
          newsletter: 'pages/newsletter.html'
        };

        let matchedPage = null;
        const lowerQuery = query.toLowerCase();

        for (let keyword in featureMap) {
          if (lowerQuery.includes(keyword) || keyword.includes(lowerQuery)) {
            matchedPage = featureMap[keyword];
            break;
          }
        }

        if (matchedPage) {
          window.location.href = matchedPage;
        } else {
          alert('No matching feature found. Try searching Wikipedia instead.');
        }
      } else {
        // ----- WIKIPEDIA SEARCH (opens in new tab) -----
        window.open(`https://en.wikipedia.org/w/index.php?search=${encodeURIComponent(query)}`, '_blank');
      }
    });
  }
})();