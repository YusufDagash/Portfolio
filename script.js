// Typing Effect
const typedRoleSpan = document.querySelector('.typed-role');
const roles = ['Software Engineering Student', 'Flutter Developer', 'UI/UX Enthusiast'];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if(!typedRoleSpan) return;
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typedRoleSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedRoleSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    // Start typing effect
    if(typedRoleSpan) {
        setTimeout(typeEffect, 1000);
    }

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));
});
