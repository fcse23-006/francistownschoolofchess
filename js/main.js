/**
 * Francistown School of Chess
 * Main Interactive Script
 */

document.addEventListener('DOMContentLoaded', function () {
  // --- Mobile Navigation Drawer ---
  const navToggle = document.getElementById('navToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (navToggle && mobileDrawer) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileDrawer.classList.toggle('active');
      navToggle.setAttribute('aria-expanded', isOpen);
      const icon = navToggle.querySelector('i');
      if (icon) {
        if (isOpen) {
          icon.classList.remove('bi-list');
          icon.classList.add('bi-x-lg');
        } else {
          icon.classList.remove('bi-x-lg');
          icon.classList.add('bi-list');
        }
      }
    });

    // Close on navigation click
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        const icon = navToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('bi-x-lg');
          icon.classList.add('bi-list');
        }
      });
    });
  }

  // --- FAQ Accordions ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', function () {
        const wasActive = item.classList.contains('active');
        // Close siblings if desired or let multiple open
        item.classList.toggle('active', !wasActive);
      });
    }
  });

  // --- Testimonial Slider ---
  const testimonials = [
    {
      text: "My son went from knowing how pieces move to winning his first junior tournament in Francistown in 6 months. Coach Molefe and the team are exceptional instructors who build real character and discipline.",
      name: "Priya M.",
      role: "Parent of Arjun (Age 9)",
      initials: "PM"
    },
    {
      text: "The online classes and interactive tactical sessions are very engaging. My daughter actually looks forward to her Saturday chess group. The coaches break down complex concepts effortlessly.",
      name: "Rajesh K.",
      role: "Parent of Ananya (Age 7)",
      initials: "RK"
    },
    {
      text: "As an adult beginner, I was nervous, but the structured curriculum made learning positional chess accessible. My rating on Lichess jumped 400 points in 3 months of private training.",
      name: "Thabo M.",
      role: "Adult Improver, Francistown",
      initials: "TM"
    },
    {
      text: "The Competitive Squad program thoroughly prepared my son for national tournament play in Gaborone. He is now ranked among the top 10 in his age category in Botswana.",
      name: "Keitumetse B.",
      role: "Parent of Tshepo (Age 12)",
      initials: "KB"
    },
    {
      text: "Francistown School of Chess provides a warm, disciplined, and intellectually stimulating environment. Both my twins are developing focus, patience, and strategic thinking.",
      name: "Lerato M.",
      role: "Parent of Twins (Age 8)",
      initials: "LM"
    }
  ];

  let currentTestimonialIndex = 0;
  let testimonialTimer = null;

  const quoteEl = document.getElementById('testimonialQuote');
  const nameEl = document.getElementById('testimonialName');
  const roleEl = document.getElementById('testimonialRole');
  const avatarEl = document.getElementById('testimonialAvatar');
  const dotsContainer = document.getElementById('sliderDots');

  function renderTestimonial(index) {
    if (!quoteEl || !nameEl || !roleEl) return;
    currentTestimonialIndex = (index + testimonials.length) % testimonials.length;
    const t = testimonials[currentTestimonialIndex];

    quoteEl.style.opacity = '0';
    quoteEl.style.transform = 'translateY(6px)';

    setTimeout(() => {
      quoteEl.textContent = `"${t.text}"`;
      nameEl.textContent = t.name;
      roleEl.textContent = t.role;
      if (avatarEl) avatarEl.textContent = t.initials;

      quoteEl.style.opacity = '1';
      quoteEl.style.transform = 'translateY(0)';
      quoteEl.style.transition = 'all 0.25s ease';
    }, 150);

    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentTestimonialIndex);
    });
  }

  function startTestimonialTimer() {
    stopTestimonialTimer();
    testimonialTimer = setInterval(() => {
      renderTestimonial(currentTestimonialIndex + 1);
    }, 6000);
  }

  function stopTestimonialTimer() {
    if (testimonialTimer) clearInterval(testimonialTimer);
  }

  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');
  const testimonialContainer = document.querySelector('.testimonial-card-main');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      renderTestimonial(currentTestimonialIndex - 1);
      startTestimonialTimer();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      renderTestimonial(currentTestimonialIndex + 1);
      startTestimonialTimer();
    });
  }

  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    testimonials.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (idx === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to testimonial ${idx + 1}`);
      dot.addEventListener('click', () => {
        renderTestimonial(idx);
        startTestimonialTimer();
      });
      dotsContainer.appendChild(dot);
    });
  }

  if (testimonialContainer) {
    testimonialContainer.addEventListener('mouseenter', stopTestimonialTimer);
    testimonialContainer.addEventListener('mouseleave', startTestimonialTimer);
    renderTestimonial(0);
    startTestimonialTimer();
  }

  // --- Share Popover ---
  const shareBtn = document.getElementById('shareBtn');
  const sharePopover = document.getElementById('sharePopover');

  if (shareBtn && sharePopover) {
    shareBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      sharePopover.classList.toggle('show');
    });

    document.addEventListener('click', function (e) {
      if (!sharePopover.contains(e.target) && e.target !== shareBtn) {
        sharePopover.classList.remove('show');
      }
    });
  }
});

// Share Actions
function shareOnPlatform(platform) {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  let shareUrl = '';

  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'email':
      shareUrl = `mailto:?subject=${title}&body=Explore Francistown School of Chess: ${url}`;
      break;
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }

  const popover = document.getElementById('sharePopover');
  if (popover) popover.classList.remove('show');
}

function copyPageUrl() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert('Link copied to clipboard.');
    const popover = document.getElementById('sharePopover');
    if (popover) popover.classList.remove('show');
  }).catch(() => {
    alert('Failed to copy link.');
  });
}
