/*===============================================
   Portfolio Website - Enhanced JavaScript
===============================================*/

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector(".nav");
    const navList = nav.querySelectorAll("li");
    const allSections = document.querySelectorAll(".section");
    const navToggler = document.querySelector(".nav-toggler");
    const aside = document.querySelector(".aside");
    const logoLink = document.querySelector(".logo a");
    
    function showSection(targetId) {
        if (!targetId) return;
        
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;
        
        allSections.forEach(section => {
            section.scrollTop = 0;
        });
        
        allSections.forEach(section => {
            section.classList.remove("active");
        });
        
        targetSection.classList.add("active");
        
        navList.forEach(item => {
            const link = item.querySelector("a");
            if (link && link.getAttribute("href") === "#" + targetId) {
                link.classList.add("active");
            } else if (link) {
                link.classList.remove("active");
            }
        });
        
        history.pushState(null, null, '#' + targetId);
    }
    
    navList.forEach(item => {
        const link = item.querySelector("a");
        if (!link) return;
        
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            try {
                const href = link.getAttribute("href");
                if (!href) return;
                
                const targetId = href.split("#")[1];
                
                showSection(targetId);
                
                if (window.innerWidth < 1200 && aside.classList.contains("open")) {
                    toggleAside();
                }
            } catch (error) {
                console.error('Navigation error:', error);
            }
        });
    });
    
    // Make logo clickable to navigate to home section
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("home");
            
            if (window.innerWidth < 1200 && aside.classList.contains("open")) {
                toggleAside();
            }
        });
    }
    
    function toggleAside() {
        aside.classList.toggle("open");
        navToggler.classList.toggle("open");
        document.body.classList.toggle("menu-open");
    }
    
    navToggler.addEventListener("click", toggleAside);
    
    const hireMeBtns = document.querySelectorAll(".hire-me");
    hireMeBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            showSection("contact");
        });
    });
    
    let initialSection = window.location.hash.replace("#", "");
    
    if (!initialSection || initialSection === "" || !document.getElementById(initialSection)) {
        initialSection = "home";
    }
    
    showSection(initialSection);
    
    const typingElement = document.querySelector(".typing");
    if (typingElement) {
        const words = ["Full Stack Developer", "MERN Stack Developer", "Web Designer", "JavaScript Engineer"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 200;
        
        function typeEffect() {
            try {
                const currentWord = words[wordIndex];
                
                if (isDeleting) {
                    typingElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                    typeSpeed = 100;
                } else {
                    typingElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                    typeSpeed = 200;
                }
                
                if (!isDeleting && charIndex === currentWord.length) {
                    isDeleting = true;
                    typeSpeed = 1000;
                } 
                else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500;
                }
                
                setTimeout(typeEffect, typeSpeed);
            } catch (error) {
                console.error('Typing animation error:', error);
                typingElement.textContent = "Full Stack Developer";
            }
        }
        
        setTimeout(typeEffect, 1000);
    }
    
    function setupThemeSwitcher() {
        try {
            const themeSwitcher = document.querySelector('.theme-switcher');
            if (!themeSwitcher) return;
            
            const icon = themeSwitcher.querySelector('i');
            if (!icon) return;
            
            // Always default to dark theme if no theme is set
            const savedTheme = localStorage.getItem('theme');
            
            if (savedTheme === 'light') {
                document.body.classList.remove('dark-mode');
                if (icon.classList.contains('fa-sun')) {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            } else {
                // Enforce dark mode by default for initial loading
                document.body.classList.add('dark-mode');
                if (icon.classList.contains('fa-moon')) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                }
                localStorage.setItem('theme', 'dark');
            }
            
            themeSwitcher.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                
                if (document.body.classList.contains('dark-mode')) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                    localStorage.setItem('theme', 'dark');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                    localStorage.setItem('theme', 'light');
                }
            });
        } catch (error) {
            console.error('Theme switcher error:', error);
            // If there's an error, ensure dark mode is applied
            document.body.classList.add('dark-mode');
        }
    }

    setupThemeSwitcher();
    
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                try {
                    const progressBars = entry.target.querySelectorAll('.progress-in');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observeSkills.unobserve(entry.target);
                } catch (error) {
                    console.error('Skill animation error:', error);
                }
            }
        });
    });
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        observeSkills.observe(skillsSection);
    }

    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.parentElement.classList.remove('focused');
            }
        });
    });
    
    // Contact form submission - Modified to work without PHP backend
    const contactSubmitBtn = document.getElementById('contact-submit');
    if (contactSubmitBtn) {
        contactSubmitBtn.addEventListener('click', function() {
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !subject || !message) {
                showMessage('Please fill out all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Create mailto link with form data
            const mailtoLink = `mailto:hi@mahendrasingh.com.np?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
            
            // Open default email client
            window.location.href = mailtoLink;
            
            // Show success message
            showMessage('Opening your email client. If it doesn\'t open automatically, please manually send your message to hi@mahendrasingh.com.np', 'success');
            
            // Clear form
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';
        });
    }
    
    function showMessage(text, type) {
        const messageContainer = document.getElementById('contact-message');
        
        if (!messageContainer) return;
        
        messageContainer.innerHTML = '';
        messageContainer.className = type === 'success' ? 'success-message' : 'error-message';
        messageContainer.style.padding = '15px';
        messageContainer.style.marginBottom = '20px';
        messageContainer.style.borderRadius = '5px';
        
        if (type === 'success') {
            messageContainer.style.backgroundColor = 'rgba(56, 161, 105, 0.2)';
            messageContainer.style.borderLeft = '4px solid #38a169';
            messageContainer.style.color = '#38a169';
        } else {
            messageContainer.style.backgroundColor = 'rgba(229, 62, 62, 0.2)';
            messageContainer.style.borderLeft = '4px solid #e53e3e';
            messageContainer.style.color = '#e53e3e';
        }
        
        messageContainer.textContent = text;
        
        // Scroll to message
        messageContainer.scrollIntoView({ behavior: 'smooth' });
        
        // Auto hide message after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                messageContainer.style.opacity = '0';
                messageContainer.style.transition = 'opacity 0.5s ease';
                
                setTimeout(() => {
                    messageContainer.innerHTML = '';
                    messageContainer.style.padding = '0';
                    messageContainer.style.marginBottom = '0';
                    messageContainer.style.opacity = '1';
                }, 500);
            }, 5000);
        }
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Section scroll navigation
    let isNavigating = false;
    let continuousScrollTimer = null;
    let lastScrollTime = 0;
    let lastSection = '';
    let isAtSectionBoundary = false;
    
    // Create toast element once and reuse it
    const toast = document.createElement('div');
    toast.className = 'section-change-toast';
    document.body.appendChild(toast);
    
    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
    }
    
    // Override the showSection function to work with scroll navigation
    const originalShowSection = showSection;
    showSection = function(targetId) {
        if (targetId === lastSection) return;
        lastSection = targetId;
        
        originalShowSection(targetId);
        
        // Reset navigation state
        setTimeout(() => {
            isNavigating = false;
            isAtSectionBoundary = false;
        }, 1000);
    };
    
    window.addEventListener('wheel', (e) => {
        if (isNavigating) return;
        
        const activeSection = document.querySelector('.section.active');
        if (!activeSection) return;
        
        // Determine scroll direction
        const direction = e.deltaY > 0 ? 'down' : 'up';
        
        // Get section dimensions
        const scrollTop = activeSection.scrollTop;
        const scrollHeight = activeSection.scrollHeight;
        const clientHeight = activeSection.clientHeight;
        
        // Check if we're at a section boundary
        const isAtBottom = direction === 'down' && Math.abs(scrollHeight - clientHeight - scrollTop) < 5;
        const isAtTop = direction === 'up' && scrollTop === 0;
        
        // Update last scroll time
        lastScrollTime = Date.now();
        
        // First time reaching the boundary
        if ((isAtBottom || isAtTop) && !isAtSectionBoundary) {
            isAtSectionBoundary = true;
            
            // Start the continuous scroll detection timer
            if (continuousScrollTimer) {
                clearTimeout(continuousScrollTimer);
            }
            
            let startTime = Date.now();
            let inactivityTimer = null;
            
            // Function to check if user stopped scrolling
            function checkScrollInactivity() {
                const currentTime = Date.now();
                if (currentTime - lastScrollTime > 200) { // 200ms without scroll events = stopped scrolling
                    // User stopped scrolling, clear everything
                    clearTimeout(continuousScrollTimer);
                    clearTimeout(inactivityTimer);
                    isAtSectionBoundary = false;
                } else {
                    // Still scrolling, check again soon
                    inactivityTimer = setTimeout(checkScrollInactivity, 100);
                }
            }
            
            // Start checking for inactivity more frequently
            inactivityTimer = setTimeout(checkScrollInactivity, 200);
            
            // Set main timer for 0.75 seconds
            continuousScrollTimer = setTimeout(() => {
                // If we're still at boundary and checking for inactivity (meaning user is still scrolling)
                if (isAtSectionBoundary && inactivityTimer) {
                    isNavigating = true;
                    clearTimeout(inactivityTimer);
                    
                    // Find next/previous section
                    const sections = Array.from(allSections);
                    const currentIndex = sections.findIndex(section => section.id === activeSection.id);
                    
                    let targetIndex, targetSectionId;
                    if (isAtBottom) {
                        targetIndex = (currentIndex + 1) % sections.length;
                        targetSectionId = sections[targetIndex].id;
                        showToast(`Moving to ${targetSectionId.charAt(0).toUpperCase() + targetSectionId.slice(1)}`);
                    } else {
                        targetIndex = (currentIndex - 1 + sections.length) % sections.length;
                        targetSectionId = sections[targetIndex].id;
                        showToast(`Moving to ${targetSectionId.charAt(0).toUpperCase() + targetSectionId.slice(1)}`);
                    }
                    
                    // Navigate after showing the toast
                    setTimeout(() => {
                        showSection(targetSectionId);
                    }, 500);
                }
            }, 750); // Changed from 1500ms to 750ms (0.75 seconds)
        }
        // If scrolled away from boundary, reset
        else if (isAtSectionBoundary && !isAtBottom && !isAtTop) {
            isAtSectionBoundary = false;
            if (continuousScrollTimer) {
                clearTimeout(continuousScrollTimer);
            }
        }
    }, { passive: true });
    
    // Fix for white screen issue when returning to tab
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
            // When tab becomes visible again, check if content is properly displayed
            const activeSection = document.querySelector('.section.active');
            
            // If no active section is found, reload the content
            if (!activeSection || getComputedStyle(activeSection).display === 'none') {
                const currentHash = window.location.hash.replace('#', '') || 'home';
                showSection(currentHash);
            }
        }
    });
});
