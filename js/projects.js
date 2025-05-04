/**
 * Projects section functionality
 */

// Store project data for modal display
const projectData = {
    project7: {
        title: "VR-Based Tour Website",
        description: "An immersive virtual reality tour platform allowing users to explore different locations in 360° VR. The website includes interactive elements, location information, and supports various VR headsets for a fully immersive experience.",
        client: "Virtual Explorations Inc.",
        date: "2023",
        role: "WebXR Developer",
        technologies: ["Three.js", "WebGL", "JavaScript", "WebVR API", "React"],
        features: [
            "360° panoramic views of different locations",
            "Interactive hotspots with additional information",
            "Support for VR headsets like Oculus, HTC Vive and Google Cardboard",
            "Location-based audio narration",
            "Smooth transitions between different viewpoints",
            "Cross-platform compatibility for desktop and mobile"
        ],
        liveLink: "https://vr-tours.example.com",
        githubLink: "https://github.com/kanhax-dev/vr-tour",
        images: [
            "project_images/project_7.jpg",
            "project_images/project_1.jpg",
            "project_images/project_4.jpg"
        ]
    },
    
    project8: {
        title: "Interactive To-Do App",
        description: "A sophisticated to-do list application with drag-and-drop task organization, categories, priorities, and detailed progress tracking. The app uses modern design principles and animations to make task management enjoyable.",
        client: "Personal Project",
        date: "2022",
        role: "Front-end Developer",
        technologies: ["JavaScript", "CSS3", "Local Storage", "Drag & Drop API", "Responsive Design"],
        features: [
            "Intuitive drag-and-drop task organization",
            "Task categorization and priority levels",
            "Due dates with reminder notifications",
            "Progress tracking and completion statistics",
            "Dark/light theme switching",
            "Offline functionality with local storage"
        ],
        liveLink: "https://todo-app.example.com",
        githubLink: "https://github.com/kanhax-dev/todo-app",
        images: [
            "project_images/project_8.jpg",
            "project_images/project_4.jpg",
            "project_images/project_3.jpg"
        ]
    },
    project1: {
        title: "Jarvis AI Assistant",
        description: "An advanced AI voice assistant that can understand natural language commands, perform tasks, and learn from user interactions. Built with Python and machine learning, it can control smart home devices, search the web, play music, and more.",
        client: "Personal Project",
        date: "2023",
        role: "Full Stack Developer",
        technologies: ["Python", "Natural Language Processing", "Speech Recognition", "TensorFlow", "OpenAI API"],
        features: [
            "Voice command recognition and natural language understanding",
            "Smart home device integration and control",
            "Web search and information retrieval",
            "Calendar and reminder management",
            "Personalized responses based on user preferences",
            "Continuous learning from user interactions"
        ],
        liveLink: "https://jarvis-ai.example.com",
        githubLink: "https://github.com/kanhax-dev/jarvis-ai",
        images: [
            "project_images/project_1.jpg",
            "project_images/project_4.jpg",
            "project_images/project_7.jpg"
        ]
    },
    project2: {
        title: "Netflix Clone",
        description: "A Netflix-inspired streaming platform featuring user authentication, content browsing by categories, video playback, and personalized recommendations. The app replicates the core functionality and UI experience of the popular streaming service.",
        client: "Personal Project",
        date: "2023",
        role: "Front-end Developer",
        technologies: ["React", "Firebase", "TMDB API", "CSS3", "Axios"],
        features: [
            "User authentication and profile management",
            "Dynamic content loading from movie database API",
            "Category-based content organization",
            "Responsive interface that works on all devices",
            "Trailer previews and content details modal"
        ],
        liveLink: "https://netflix-clone.example.com",
        githubLink: "https://github.com/kanhax-dev/netflix-clone",
        images: [
            "project_images/project_2.jpg",
            "project_images/project_5.jpg", 
            "project_images/project_6.jpg"
        ]
    },
    project3: {
        title: "Elegance Fashion E-commerce",
        description: "A sophisticated e-commerce platform for fashion retail with an elegant user interface, product catalog, shopping cart functionality, secure checkout, and user account management. Features a visually appealing design focused on showcasing clothing and accessories.",
        client: "Elegance Fashion",
        date: "2023",
        role: "Full Stack Developer",
        technologies: ["React", "Node.js", "MongoDB", "Express", "Stripe", "AWS S3"],
        features: [
            "Product catalog with filtering and sorting options",
            "User authentication and profile management",
            "Shopping cart and wishlist functionality",
            "Secure payment processing",
            "Order tracking and history",
            "Responsive design for mobile and desktop shopping"
        ],
        liveLink: "https://elegance-fashion.example.com",
        githubLink: "https://github.com/kanhax-dev/elegance-fashion",
        images: [
            "project_images/project_3.jpg",
            "project_images/project_8.jpg",
            "project_images/project_1.jpg"
        ]
    },
    project4: {
        title: "Pomodoro Timer",
        description: "A productivity tool based on the Pomodoro Technique, featuring customizable work and break intervals, task tracking, and statistics. The timer helps users maintain focus and productivity by alternating between concentrated work periods and short breaks.",
        client: "Personal Project",
        date: "2022",
        role: "Front-end Developer",
        technologies: ["JavaScript", "CSS3", "HTML5", "Local Storage", "SVG Animation"],
        features: [
            "Customizable work and break intervals",
            "Task tracking and completion history",
            "Audio notifications and visual alerts",
            "Productivity statistics and analytics",
            "Offline functionality using local storage",
            "Elegant and distraction-free UI design"
        ],
        liveLink: "https://pomodoro-timer.example.com",
        githubLink: "https://github.com/kanhax-dev/pomodoro",
        images: [
            "project_images/project_4.jpg",
            "project_images/project_8.jpg",
            "project_images/project_7.jpg"
        ]
    },
    project5: {
        title: "Disney+ Clone",
        description: "A Disney+ streaming platform clone featuring user authentication, content browsing by categories, video playback, and a sleek UI design. The app includes branded sections for Disney, Pixar, Marvel, Star Wars, and National Geographic content.",
        client: "Personal Project",
        date: "2022",
        role: "Front-end Developer",
        technologies: ["React", "Redux", "Styled Components", "Firebase", "TMDB API"],
        features: [
            "User authentication and profile system",
            "Dynamic content loading by franchises and categories",
            "Responsive grid layout for browsing titles",
            "Content details page with trailers and related content",
            "Immersive UI with animated transitions",
            "Watchlist and continue watching functionality"
        ],
        liveLink: "https://disney-plus-clone.example.com",
        githubLink: "https://github.com/kanhax-dev/disney-clone",
        images: [
            "project_images/project_5.jpg",
            "project_images/project_2.jpg",
            "project_images/project_6.jpg"
        ]
    },
    project6: {
        title: "Instagram Clone",
        description: "A feature-rich Instagram clone with social media functionality including photo sharing, comments, likes, user profiles, and direct messaging. The app accurately recreates the core social experience of the popular platform.",
        client: "Personal Project",
        date: "2022",
        role: "Full Stack Developer",
        technologies: ["React", "Firebase", "Material UI", "Firestore", "Cloud Functions"],
        features: [
            "User authentication and profile customization",
            "Photo upload with filters and editing tools",
            "Feed algorithm showing posts from followed users",
            "Comments, likes, and post saving functionality",
            "Real-time notifications and activity feed",
            "Direct messaging between users"
        ],
        liveLink: "https://instagram-clone.example.com",
        githubLink: "https://github.com/kanhax-dev/instagram-clone",
        images: [
            "project_images/project_6.jpg",
            "project_images/project_3.jpg",
            "project_images/project_2.jpg"
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
