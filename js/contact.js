
// Simple front-end form handling (prevents actual submit)
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const messageDiv = document.getElementById('form-message');
    messageDiv.className = 'form-message success';
    messageDiv.textContent = 'Thanks for reaching out! (Demo – no message was actually sent.)';
});
