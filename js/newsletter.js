// Simple front‑end demo for newsletter form
document.getElementById('newsletter-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('newsletter-email').value;
    const messageDiv = document.getElementById('newsletter-message');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = `Thanks! A confirmation email has been sent to ${email} (demo).`;
    messageDiv.style.display = 'block';
    this.reset(); // optional
});