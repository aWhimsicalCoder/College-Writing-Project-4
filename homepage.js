document.addEventListener("DOMContentLoaded", function () {
    const readMoreButton = document.querySelector(".read-more-button");
    const readMoreContent = document.querySelector(".read-more-content");
    const parallax = document.querySelector('.parallax');
    const header = document.querySelector('.header');

    // Initialize parallax effect once the header size is known
    function initializeParallax() {
        const headerHeight = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

        // Manually trigger the scroll event to immediately apply the parallax effect
        handleScroll(); // Call the scroll handler to set the initial background position
    }

    // Scroll event handler
    function handleScroll() {
        var scrollPosition = window.pageYOffset;
        var parallaxSpeed = 0.5;
        var limit = parallax.offsetTop + parallax.offsetHeight;
        if (scrollPosition <= limit) {
            parallax.style.backgroundPositionY = (scrollPosition * parallaxSpeed) + 'px';
        }
    }

    // Set up event listeners
    window.addEventListener('scroll', handleScroll);
    readMoreButton.addEventListener("click", function () {
        readMoreContent.classList.toggle('expanded');
        readMoreButton.textContent = readMoreContent.classList.contains('expanded') ? "Read Less" : "Read More";
    });
    document.querySelectorAll('.key-term').forEach(function (elem) {
        elem.addEventListener('click', function () {
            let tooltip = elem.querySelector('.tooltip');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = elem.getAttribute('data-definition');
                elem.appendChild(tooltip);
            }
            tooltip.classList.toggle('active');
        });
    });
    document.addEventListener('click', function (e) {
        if (!e.target.classList.contains('key-term')) {
            document.querySelectorAll('.tooltip').forEach(function (tip) {
                tip.classList.remove('active');
            });
        }
    });
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, {
        rootMargin: "0px",
        threshold: 0.1
    });
    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });

    // Initialize the parallax effect after setting up all handlers
    initializeParallax();
});