function openNav() {
    document.getElementById("sidebar").style.width = "250px";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
}

// Combine all DOMContentLoaded event listeners into a single function
document.addEventListener('DOMContentLoaded', function() {
    // Close navigation on page load
    closeNav();
    
    // Initialize text animation
    animateText();
    
    // Initialize modal functionality
    initializeModal();
    
    // Initialize scroll reveal animation
    initializeScrollReveal();
    
    // Set paragraph indices for intro section on page load
    const introParagraphs = document.querySelectorAll('#intro p');
    introParagraphs.forEach((p, index) => {
        p.style.setProperty('--paragraph-index', index);
    });
});

function scrollToContent() {
    const mainContent = document.getElementById('main-content');
    const offset = -30; 
    const targetPosition = mainContent.offsetTop - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

function animateText() {
    const letters = document.querySelectorAll('.letter');
    
    // Cache the letters length to avoid recalculating in the loop
    const lettersLength = letters.length;
    
    // Reset all letters to invisible
    for (let i = 0; i < lettersLength; i++) {
        letters[i].style.opacity = '0';
    }
    
    // Animate each letter with a delay
    for (let i = 0; i < lettersLength; i++) {
        setTimeout(() => {
            letters[i].style.opacity = '1';
        }, i * 200);
    }

    const totalDisplayTime = lettersLength * 200;

    setTimeout(() => {
        // Hide all letters
        for (let i = 0; i < lettersLength; i++) {
            letters[i].style.opacity = '0';
        }
        
        // Restart animation after delay
        setTimeout(animateText, 3000);
    }, totalDisplayTime + 1000);
}

// Consolidated modal functionality
function initializeModal() {
    const modal = document.getElementById("modal");
    if (!modal) return; // Exit if modal doesn't exist on this page
    
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalImage = document.getElementById("modal-image");
    const modalClose = document.getElementById("modal-close");

    // Event delegation for grid items
    document.addEventListener('click', function(e) {
        const gridItem = e.target.closest('.grid-item');
        if (gridItem) {
            const title = gridItem.getAttribute("data-title");
            const description = gridItem.getAttribute("data-description");
            const image = gridItem.getAttribute("data-image");

            modalTitle.textContent = title;
            modalDescription.innerHTML = description;
            
            if (modalImage && image) {
                modalImage.src = image;
            }

            modal.classList.add("active");
        }
    });

    // Close modal when clicking close button
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    // Close modal when clicking outside
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
}

// Sidebar navigation functionality
const initSidebar = (function() {
    // Using event delegation for better performance
    document.addEventListener('click', function(e) {
        // Handle hamburger click
        if (e.target.closest('.hamburger')) {
            e.preventDefault();
            e.stopPropagation();
            
            const sidebar = document.querySelector('.sidebar-menu');
            const hamburger = e.target.closest('.hamburger');
            
            if (!sidebar.classList.contains('transitioning')) {
                sidebar.classList.add('transitioning');
                sidebar.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                setTimeout(() => {
                    sidebar.classList.remove('transitioning');
                }, 300);
            }
        }
        
        // Handle close button click
        else if (e.target.closest('.close-btn')) {
            e.preventDefault();
            e.stopPropagation();
            
            const sidebar = document.querySelector('.sidebar-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (!sidebar.classList.contains('transitioning')) {
                sidebar.classList.add('transitioning');
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
                
                setTimeout(() => {
                    sidebar.classList.remove('transitioning');
                }, 300);
            }
        }
        
        // Handle clicking outside sidebar
        else {
            const sidebar = document.querySelector('.sidebar-menu');
            const hamburger = document.querySelector('.hamburger');
            
            if (sidebar && sidebar.classList.contains('active') && 
                !sidebar.contains(e.target) && 
                !hamburger.contains(e.target)) {
                
                sidebar.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
})();

// Scroll reveal animation
function initializeScrollReveal() {
    const sections = document.querySelectorAll('.section');
    if (!sections.length) return;
    
    // Create a new Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // If the element is in view
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
                // If this is the intro section, set paragraph indices for staggered animation
                if (entry.target.id === 'intro') {
                    const paragraphs = entry.target.querySelectorAll('p');
                    paragraphs.forEach((p, index) => {
                        p.style.setProperty('--paragraph-index', index);
                    });
                }
            }
        });
    }, {
        root: null, // Use the viewport as the root
        threshold: 0.1, // Trigger when at least 10% of the element is visible
        rootMargin: '0px 0px -100px 0px' // Adjust when the animation triggers
    });
    
    // Observe all section elements
    sections.forEach(section => {
        observer.observe(section);
    });
}
