/*
 * Client-side scripts for D3‑FORGE website
 *
 * This JavaScript module implements interactive behaviours for the site:
 * – responsive navigation toggling for small screens;
 * – adding a background to the navigation bar on scroll;
 * – scroll reveal effect using IntersectionObserver;
 * – simple contact form handling that prevents default submission and
 *   displays a success message.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  const navLinks = document.querySelectorAll('.mobile-nav a');

  hamburger?.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });

  // Navbar background change on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Scroll reveal using IntersectionObserver
  const observerOptions = {
    threshold: 0.1
  };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    revealObserver.observe(el);
  });

  // Contact form submission handler
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // rudimentary form validation
      const name = contactForm.querySelector('input[name="name"]').value.trim();
      const email = contactForm.querySelector('input[name="email"]').value.trim();
      const message = contactForm.querySelector('textarea[name="message"]').value.trim();
      if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
      }
      // display success message
      const successMsg = document.createElement('p');
      successMsg.textContent = 'Thank you for contacting us! We will get back to you shortly.';
      successMsg.style.color = 'var(--colour-secondary)';
      contactForm.appendChild(successMsg);
      contactForm.reset();
    });
  }

  // Course card modal interactions
  // If course cards and modals exist on the page, attach event listeners to display the corresponding course content inside a modal overlay.
  const courseCards = document.querySelectorAll('.course-card');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  courseCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Prevent default navigation to allow in-page modal display; the href remains for graceful degradation
      e.preventDefault();
      const courseId = card.getAttribute('data-course');
      const modal = document.getElementById(`modal-${courseId}`);
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.modal');
      if (parent) parent.style.display = 'none';
    });
  });

  // Close modal when clicking outside of the content area
  modals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  });
});