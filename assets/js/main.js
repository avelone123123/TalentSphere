/* TalentSphere - Main JavaScript */

document.addEventListener('DOMContentLoaded', function() {
  initScrollAnimations();
  initThemeToggle();
  initNavbar();
  initSearchFilters();
  initChatFunctions();
  initFormValidation();
});

// ========== SCROLL ANIMATIONS ==========
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  const elements = document.querySelectorAll('.feature-card, .project-card, .stat-card');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
  });
}

// ========== THEME TOGGLE ==========
function initThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    themeToggle.style.transform = 'scale(0.8) rotate(360deg)';
    setTimeout(() => themeToggle.style.transform = 'scale(1)', 300);
  });
}

// ========== NAVBAR ==========
function initNavbar() {
  const navbar = document.querySelector('.navbar-custom');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(15, 15, 26, 0.95)';
      navbar.style.boxShadow = '0 5px 30px rgba(106, 0, 255, 0.3)';
    } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.05)';
      navbar.style.boxShadow = 'none';
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ========== SEARCH & FILTERS ==========
function initSearchFilters() {
  const searchInput = document.getElementById('projectSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll('.project-card').forEach(card => {
        const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
        card.style.display = title.includes(term) ? 'block' : 'none';
      });
    });
  }
}

// ========== CHAT ==========
function initChatFunctions() {
  const chatItems = document.querySelectorAll('.chat-item');
  const sendButton = document.getElementById('sendMessage');
  const messageInput = document.getElementById('messageInput');

  chatItems.forEach(item => {
    item.addEventListener('click', () => {
      chatItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  if (sendButton && messageInput) {
    sendButton.addEventListener('click', () => sendMessage());
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });
  }
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const chatWindow = document.getElementById('chatMessages');
  if (!input || !chatWindow) return;

  const text = input.value.trim();
  if (!text) return;

  const msg = document.createElement('div');
  msg.className = 'd-flex mb-3 justify-content-end';
  msg.innerHTML = `<div class="message-bubble message-sent">${text}</div>`;
  chatWindow.appendChild(msg);
  input.value = '';
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// ========== FORM VALIDATION ==========
function initFormValidation() {
  document.querySelectorAll('.needs-validation').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}
