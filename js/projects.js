/**
 * Projects section functionality
 */

// Store project data for modal display
const projectData = {
    project1: {
        title: "E-commerce Platform",
        description: "A full-featured e-commerce platform with product catalog, shopping cart, user authentication, payment processing, and admin dashboard. The platform supports multiple payment gateways and has a responsive design for all devices.",
        client: "RetailTech Solutions",
        date: "2023",
        role: "Lead Frontend Developer",
        technologies: ["React", "Redux", "Node.js", "Express", "MongoDB", "Stripe API", "AWS S3"],
        features: [
            "User authentication and profile management",
            "Product search with filters and sorting",
            "Real-time shopping cart updates",
            "Secure payment processing with multiple gateways",
            "Order tracking and history",
            "Admin dashboard for inventory management"
        ],
        liveLink: "https://ecommerce-platform.example.com",
        githubLink: "https://github.com/johndoe/ecommerce",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    },
    project2: {
        title: "Fitness Tracker App",
        description: "A mobile application for tracking fitness activities, setting goals, and monitoring progress. The app includes workout plans, nutrition tracking, and social features to connect with friends and share achievements.",
        client: "FitLife Health",
        date: "2022",
        role: "Mobile Developer",
        technologies: ["React Native", "Firebase", "Redux", "Google Fit API", "Apple HealthKit"],
        features: [
            "Personalized workout plans and progress tracking",
            "Integration with wearable devices",
            "Nutrition and meal planning",
            "Goal setting and achievement badges",
            "Social sharing and community challenges"
        ],
        liveLink: "https://fittracker.example.com",
        githubLink: "https://github.com/johndoe/fitness-app",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    },
    project3: {
        title: "Blog Platform",
        description: "A modern blog platform with rich text editing, categories, tags, and user comments. The platform supports multiple authors, featured posts, and has a clean, responsive design. SEO optimizations are built-in for better search engine visibility.",
        client: "ContentCreators Inc.",
        date: "2022",
        role: "Full Stack Developer",
        technologies: ["Vue.js", "Nuxt.js", "Express", "PostgreSQL", "Markdown", "AWS"],
        features: [
            "Rich text editor with markdown support",
            "Category and tag organization",
            "User comments and notifications",
            "Author profiles and dashboards",
            "SEO optimized article pages",
            "Analytics for tracking article performance"
        ],
        liveLink: "https://blog-platform.example.com",
        githubLink: "https://github.com/johndoe/blog-platform",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    },
    project4: {
        title: "Image Recognition AI",
        description: "An AI-powered image recognition system that can identify objects, faces, and scenes in photographs. The system uses deep learning models trained on large datasets and provides an API for developers to integrate into their applications.",
        client: "AI Research Lab",
        date: "2021",
        role: "Machine Learning Engineer",
        technologies: ["Python", "TensorFlow", "Keras", "OpenCV", "Flask", "Docker"],
        features: [
            "Real-time object detection and classification",
            "Face recognition with emotion analysis",
            "Scene understanding and context recognition",
            "RESTful API for third-party integration",
            "Batch processing for large image datasets",
            "Model training interface for custom object detection"
        ],
        liveLink: "https://image-ai.example.com",
        githubLink: "https://github.com/johndoe/ml-project",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    },
    project5: {
        title: "Task Management System",
        description: "A comprehensive task management system for teams with project organization, task assignments, deadlines, and progress tracking. The system includes reporting tools, time tracking, and integration with popular calendar applications.",
        client: "ProductivityPro",
        date: "2021",
        role: "Full Stack Developer",
        technologies: ["Angular", "TypeScript", "Spring Boot", "Java", "MySQL", "Docker"],
        features: [
            "Project and task organization with drag-and-drop interface",
            "User roles and permission management",
            "Deadline notifications and reminders",
            "Time tracking and reporting",
            "Calendar integration (Google, Outlook)",
            "Document attachment and version control"
        ],
        liveLink: "https://task-manager.example.com",
        githubLink: "https://github.com/johndoe/task-manager",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    },
    project6: {
        title: "Weather Forecast App",
        description: "A weather forecast application that provides real-time weather data, hourly and daily forecasts, and severe weather alerts. The app includes interactive maps, radar imagery, and customizable notifications for user-defined locations.",
        client: "WeatherTech Solutions",
        date: "2020",
        role: "Mobile Developer",
        technologies: ["Flutter", "Dart", "Firebase", "Weather API", "Google Maps API"],
        features: [
            "Real-time weather updates and forecasts",
            "Interactive maps with radar and satellite imagery",
            "Location-based weather alerts and notifications",
            "Customizable dashboard with favorite locations",
            "Historical weather data and trends",
            "Widget support for quick access to weather information"
        ],
        liveLink: "https://weather-app.example.com",
        githubLink: "https://github.com/johndoe/weather-app",
        images: [
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500",
            "https://via.placeholder.com/800x500"
        ]
    }
};

function initProjects() {
    setupProjectFilter();
    setupProjectDetails();
    setupGalleryThumbs();
    addProjectEffects();
}

/**
 * Setup project category filtering
 */
function setupProjectFilter() {
    const filterButtons = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    // Show with animation
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    // Hide with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

/**
 * Setup project details modal functionality
 */
function setupProjectDetails() {
    const detailsButtons = document.querySelectorAll('.project-details-btn');
    const modal = document.getElementById('project-modal');
    const modalContent = modal.querySelector('.modal-content');
    const modalClose = modal.querySelector('.modal-close');
    
    // Open modal
    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            const project = projectData[projectId];
            
            if (project) {
                // Fill modal content
                document.getElementById('modal-title').textContent = project.title;
                document.getElementById('modal-description').textContent = project.description;
                document.getElementById('modal-client').textContent = project.client;
                document.getElementById('modal-date').textContent = project.date;
                document.getElementById('modal-role').textContent = project.role;
                
                // Set main image
                document.getElementById('modal-main-image').src = project.images[0];
                
                // Set technologies
                const techContainer = document.getElementById('modal-technologies');
                techContainer.innerHTML = '';
                project.technologies.forEach(tech => {
                    const span = document.createElement('span');
                    span.textContent = tech;
                    techContainer.appendChild(span);
                });
                
                // Set features
                const featuresList = document.getElementById('modal-features');
                featuresList.innerHTML = '';
                project.features.forEach(feature => {
                    const li = document.createElement('li');
                    li.textContent = feature;
                    featuresList.appendChild(li);
                });
                
                // Set links
                document.getElementById('modal-live-link').href = project.liveLink;
                document.getElementById('modal-github-link').href = project.githubLink;
                
                // Show modal with animation
                modal.style.display = 'flex';
                setTimeout(() => {
                    modal.classList.add('active');
                    setTimeout(() => {
                        modalContent.style.opacity = '1';
                        modalContent.style.transform = 'translateY(0)';
                    }, 100);
                }, 10);
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    function closeModal() {
        modalContent.style.opacity = '0';
        modalContent.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }, 200);
    }
}

/**
 * Setup gallery thumbnail functionality
 */
function setupGalleryThumbs() {
    const thumbs = document.querySelectorAll('.gallery-thumbs .thumb');
    const mainImage = document.getElementById('modal-main-image');
    
    thumbs.forEach((thumb, index) => {
        thumb.addEventListener('click', () => {
            // Update active thumb
            thumbs.forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            
            // Update main image with crossfade effect
            mainImage.style.opacity = '0';
            setTimeout(() => {
                const projectId = document.querySelector('.project-details-btn[data-project]').getAttribute('data-project');
                mainImage.src = projectData[projectId].images[index] || thumb.src;
                mainImage.style.opacity = '1';
            }, 300);
        });
    });
}

/**
 * Add hover effects and animations to project cards
 */
function addProjectEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        // Add staggered animation on scroll
        observeElement(card, () => {
            card.classList.add('animate-in');
        });
        
        // Add parallax effect on hover (subtle movement)
        card.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = card.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            card.style.transform = `perspective(1000px) rotateX(${y * 5}deg) rotateY(${x * 5}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

/**
 * Observe element and trigger callback when it enters viewport
 * @param {Element} element - The element to observe
 * @param {Function} callback - The callback to execute
 */
function observeElement(element, callback) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.1 });
    
    observer.observe(element);
}

// Initialize projects functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', initProjects);
