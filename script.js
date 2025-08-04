// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = mobileMenu.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navMenu.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }
});

// Services Page Functionality
if (window.location.pathname.includes('services.html') || window.location.pathname.endsWith('/services.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const serviceCards = document.querySelectorAll('.service-card');
        const excuseLists = document.querySelectorAll('.excuses-list');
        
        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const category = this.getAttribute('data-category');
                const targetList = document.getElementById(category + '-excuses');
                
                // Remove active class from all cards and lists
                serviceCards.forEach(c => c.classList.remove('active'));
                excuseLists.forEach(list => list.classList.remove('active'));
                
                // Add active class to clicked card and corresponding list
                this.classList.add('active');
                if (targetList) {
                    targetList.classList.add('active');
                    
                    // Smooth scroll to the excuses list
                    targetList.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'start' 
                    });
                }
            });
        });
        
        // Add click-to-copy functionality for excuse items
        const excuseItems = document.querySelectorAll('.excuse-item');
        excuseItems.forEach(item => {
            item.addEventListener('click', function() {
                const text = this.textContent;
                
                // Try to copy to clipboard
                if (navigator.clipboard && window.isSecureContext) {
                    navigator.clipboard.writeText(text).then(() => {
                        showCopyNotification(this);
                    }).catch(() => {
                        fallbackCopyTextToClipboard(text, this);
                    });
                } else {
                    fallbackCopyTextToClipboard(text, this);
                }
            });
        });
        
        function showCopyNotification(element) {
            const originalText = element.textContent;
            element.textContent = '✅ Copied to clipboard!';
            element.style.background = 'linear-gradient(45deg, #00b894, #00cec9)';
            
            setTimeout(() => {
                element.textContent = originalText;
                element.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }, 2000);
        }
        
        function fallbackCopyTextToClipboard(text, element) {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showCopyNotification(element);
            } catch (err) {
                console.error('Fallback: Oops, unable to copy', err);
            }
            
            document.body.removeChild(textArea);
        }
    });
}

// Contact Form Functionality
if (window.location.pathname.includes('contact.html') || window.location.pathname.endsWith('/contact.html')) {
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('excuse-form');
        const successMessage = document.getElementById('success-message');
        
        if (form && successMessage) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(form);
                const name = formData.get('name');
                const email = formData.get('email');
                const situation = formData.get('situation');
                
                // Simple validation
                if (!name || !email || !situation) {
                    alert('Please fill in all fields!');
                    return;
                }
                
                // Simulate form submission
                const submitBtn = form.querySelector('.submit-btn');
                const originalText = submitBtn.textContent;
                
                submitBtn.textContent = 'Crafting Your Excuse...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    // Hide form and show success message
                    form.style.display = 'none';
                    successMessage.classList.add('show');
                    
                    // Add some personalized humor to the success message
                    const personalizedMessages = [
                        `Thanks ${name}! We're working on an excuse so good, even we believe it.`,
                        `${name}, your situation is so unique, our team had to consult ancient excuse texts.`,
                        `Dear ${name}, we've forwarded your case to our most creative excuse artist.`,
                        `${name}, we're impressed by your situation. It's going in our Hall of Fame.`
                    ];
                    
                    const randomMessage = personalizedMessages[Math.floor(Math.random() * personalizedMessages.length)];
                    successMessage.querySelector('p').textContent = randomMessage;
                    
                }, 2000);
            });
        }
    });
}

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add some fun interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to excuse cards on home page
    const excuseCards = document.querySelectorAll('.excuse-card');
    excuseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) rotateX(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotateX(0)';
        });
    });
    
    // Add parallax effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
    
    // Add typing effect to tagline (only on home page)
    const tagline = document.querySelector('.hero .tagline');
    if (tagline && tagline.textContent === 'Because honesty is overrated.') {
        const text = tagline.textContent;
        tagline.textContent = '';
        tagline.style.borderRight = '2px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    tagline.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
});

// Add some Easter eggs
document.addEventListener('DOMContentLoaded', function() {
    let konami = [];
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
    
    document.addEventListener('keydown', function(e) {
        konami.push(e.keyCode);
        if (konami.length > konamiCode.length) {
            konami.shift();
        }
        
        if (konami.join(',') === konamiCode.join(',')) {
            // Easter egg activated!
            document.body.style.transform = 'rotate(360deg)';
            document.body.style.transition = 'transform 2s ease';
            
            setTimeout(() => {
                alert('🎉 Congratulations! You found our secret excuse: "I can\'t do anything right now because I just unlocked a hidden Easter egg and need to process this achievement."');
                document.body.style.transform = 'none';
            }, 2000);
            
            konami = [];
        }
    });
    
    // Logo click counter
    let logoClicks = 0;
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            logoClicks++;
            if (logoClicks === 10) {
                e.preventDefault();
                alert('🤯 You\'ve clicked our logo 10 times! Here\'s your reward excuse: "I can\'t explain my behavior because I\'m testing the structural integrity of website logos."');
                logoClicks = 0;
            }
        });
    }
});

// Performance optimization: Lazy load images if any are added later
document.addEventListener('DOMContentLoaded', function() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
});

// Add visual feedback for form interactions
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.2s ease';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});