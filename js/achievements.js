/**
 * Achievements and Badges System
 */

// Store for achievements and user progress
const achievements = {
    // Exploration achievements
    explorer: {
        name: "Explorer",
        description: "Visit all sections of the portfolio",
        icon: "fas fa-compass",
        progress: 0,
        total: 7, // Number of main sections
        unlocked: false,
        sections: {
            home: false,
            about: false,
            skills: false,
            projects: false,
            journey: false,
            education: false,
            contact: false
        }
    },
    
    // Project interaction achievements
    projectExplorer: {
        name: "Project Connoisseur",
        description: "View details of at least 3 different projects",
        icon: "fas fa-folder-open",
        progress: 0,
        total: 3,
        unlocked: false,
        projects: {}
    },
    
    // Skill interaction achievements
    skillMaster: {
        name: "Skill Inspector",
        description: "Switch between all skill views and categories",
        icon: "fas fa-chart-pie",
        progress: 0,
        total: 2, // Views (bar, radar) * number of categories
        unlocked: false,
        interactions: {
            barView: false,
            radarView: false
        }
    },
    
    // Profile interaction achievement
    networkingPro: {
        name: "Networking Pro",
        description: "Check out my GitHub or social profiles",
        icon: "fas fa-code-branch",
        unlocked: false
    },
    
    // Contact achievement
    communicator: {
        name: "Communicator",
        description: "Fill out the contact form correctly",
        icon: "fas fa-paper-plane",
        unlocked: false
    },
    
    // Time spent achievement
    dedicated: {
        name: "Dedicated Visitor",
        description: "Spend at least 2 minutes exploring the portfolio",
        icon: "fas fa-hourglass-half",
        progress: 0,
        total: 120, // in seconds
        unlocked: false
    },
    
    // Interactive elements achievement
    interactive: {
        name: "Interactive Guest",
        description: "Interact with at least 5 interactive elements",
        icon: "fas fa-hand-pointer",
        progress: 0,
        total: 5,
        unlocked: false,
        interactions: 0
    },
    
    // Easter egg achievement
    easterEgg: {
        name: "Code Sleuth",
        description: "Found the secret easter egg. Nice job!",
        icon: "fas fa-egg",
        unlocked: false,
        secret: true
    }
};

// Local storage key for achievements
const ACHIEVEMENTS_STORAGE_KEY = 'portfolio_achievements';

/**
 * Initialize the achievements system
 */
function initAchievements() {
    loadAchievements();
    createAchievementsPanel();
    setupAchievementTracking();
    startTimeTracking();
    setupEasterEgg();
}

/**
 * Load achievements from local storage
 */
function loadAchievements() {
    const savedAchievements = localStorage.getItem(ACHIEVEMENTS_STORAGE_KEY);
    if (savedAchievements) {
        try {
            const parsed = JSON.parse(savedAchievements);
            // Update only the unlocked status and progress, not the definitions
            for (const key in parsed) {
                if (achievements[key]) {
                    achievements[key].unlocked = parsed[key].unlocked;
                    achievements[key].progress = parsed[key].progress;
                    
                    // Copy nested tracking objects if they exist
                    if (parsed[key].sections) {
                        achievements[key].sections = parsed[key].sections;
                    }
                    if (parsed[key].projects) {
                        achievements[key].projects = parsed[key].projects;
                    }
                    if (parsed[key].interactions) {
                        achievements[key].interactions = parsed[key].interactions;
                    }
                }
            }
        } catch (e) {
            console.error('Error parsing achievements:', e);
        }
    }
}

/**
 * Save achievements to local storage
 */
function saveAchievements() {
    localStorage.setItem(ACHIEVEMENTS_STORAGE_KEY, JSON.stringify(achievements));
}

/**
 * Create the achievements panel
 */
function createAchievementsPanel() {
    // Create the achievements button
    const achievementsButton = document.createElement('button');
    achievementsButton.id = 'achievements-button';
    achievementsButton.innerHTML = '<i class="fas fa-trophy"></i>';
    achievementsButton.title = 'Achievements';
    document.body.appendChild(achievementsButton);
    
    // Create the achievements panel
    const achievementsPanel = document.createElement('div');
    achievementsPanel.id = 'achievements-panel';
    achievementsPanel.className = 'achievements-panel';
    achievementsPanel.innerHTML = `
        <div class="achievements-header">
            <h2><i class="fas fa-trophy"></i> Achievements</h2>
            <button id="close-achievements"><i class="fas fa-times"></i></button>
        </div>
        <div class="achievements-content">
            <div class="achievements-intro">
                <p>Unlock achievements as you explore my portfolio!</p>
                <div class="achievements-progress">
                    <div class="progress-bar">
                        <div class="progress" id="overall-progress"></div>
                    </div>
                    <span id="progress-text">0/8 Unlocked</span>
                </div>
            </div>
            <div class="achievements-list" id="achievements-list">
                <!-- Achievements will be inserted here -->
            </div>
        </div>
    `;
    document.body.appendChild(achievementsPanel);
    
    // Populate the achievements list
    populateAchievements();
    
    // Add event listeners
    achievementsButton.addEventListener('click', toggleAchievementsPanel);
    document.getElementById('close-achievements').addEventListener('click', toggleAchievementsPanel);
}

/**
 * Populate the achievements list
 */
function populateAchievements() {
    const achievementsList = document.getElementById('achievements-list');
    achievementsList.innerHTML = '';
    
    let unlockedCount = 0;
    const totalAchievements = Object.keys(achievements).length;
    
    for (const key in achievements) {
        const achievement = achievements[key];
        if (achievement.unlocked) {
            unlockedCount++;
        }
        
        // Don't show secret achievements until unlocked
        if (achievement.secret && !achievement.unlocked) {
            continue;
        }
        
        const achievementElement = document.createElement('div');
        achievementElement.className = `achievement ${achievement.unlocked ? 'unlocked' : 'locked'}`;
        
        let progressHtml = '';
        if ('progress' in achievement && 'total' in achievement) {
            const percent = Math.min(100, Math.round((achievement.progress / achievement.total) * 100));
            progressHtml = `
                <div class="achievement-progress">
                    <div class="progress-bar">
                        <div class="progress" style="width: ${percent}%"></div>
                    </div>
                    <span>${achievement.progress}/${achievement.total}</span>
                </div>
            `;
        }
        
        achievementElement.innerHTML = `
            <div class="achievement-icon ${achievement.unlocked ? '' : 'locked'}">
                <i class="${achievement.icon}"></i>
            </div>
            <div class="achievement-details">
                <h3>${achievement.name}</h3>
                <p>${achievement.description}</p>
                ${progressHtml}
            </div>
        `;
        
        achievementsList.appendChild(achievementElement);
    }
    
    // Update overall progress
    const overallProgress = document.getElementById('overall-progress');
    const progressText = document.getElementById('progress-text');
    
    const progressPercent = Math.round((unlockedCount / totalAchievements) * 100);
    overallProgress.style.width = `${progressPercent}%`;
    progressText.textContent = `${unlockedCount}/${totalAchievements} Unlocked`;
}

/**
 * Toggle the achievements panel
 */
function toggleAchievementsPanel() {
    const panel = document.getElementById('achievements-panel');
    panel.classList.toggle('active');
    
    if (panel.classList.contains('active')) {
        // Update achievements display when opening
        populateAchievements();
    }
}

/**
 * Set up achievement tracking
 */
function setupAchievementTracking() {
    // Track section visits
    trackSectionVisits();
    
    // Track project interactions
    trackProjectInteractions();
    
    // Track skill view interactions
    trackSkillInteractions();
    
    // Track profile interactions
    trackProfileInteractions();
    
    // Track contact form interactions
    trackContactInteractions();
    
    // Track interactive elements
    trackInteractiveElements();
}

/**
 * Track section visits using Intersection Observer
 */
function trackSectionVisits() {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (achievements.explorer.sections.hasOwnProperty(sectionId) && !achievements.explorer.sections[sectionId]) {
                    achievements.explorer.sections[sectionId] = true;
                    achievements.explorer.progress++;
                    
                    // Check if all sections have been visited
                    if (achievements.explorer.progress >= achievements.explorer.total && !achievements.explorer.unlocked) {
                        achievements.explorer.unlocked = true;
                        showAchievementNotification(achievements.explorer);
                    }
                    
                    saveAchievements();
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * Track project interactions
 */
function trackProjectInteractions() {
    const projectButtons = document.querySelectorAll('.project-details-btn');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            if (!achievements.projectExplorer.projects[projectId]) {
                achievements.projectExplorer.projects[projectId] = true;
                achievements.projectExplorer.progress++;
                
                // Check if enough projects have been viewed
                if (achievements.projectExplorer.progress >= achievements.projectExplorer.total && !achievements.projectExplorer.unlocked) {
                    achievements.projectExplorer.unlocked = true;
                    showAchievementNotification(achievements.projectExplorer);
                }
                
                saveAchievements();
            }
            
            // Also count as an interactive element
            incrementInteractiveAchievement();
        });
    });
}

/**
 * Track skill view interactions
 */
function trackSkillInteractions() {
    // Track skill view toggle
    const viewToggleButtons = document.querySelectorAll('.skills-view-toggle button');
    viewToggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const view = button.getAttribute('data-view');
            if (view === 'bars' && !achievements.skillMaster.interactions.barView) {
                achievements.skillMaster.interactions.barView = true;
                achievements.skillMaster.progress++;
            } else if (view === 'radar' && !achievements.skillMaster.interactions.radarView) {
                achievements.skillMaster.interactions.radarView = true;
                achievements.skillMaster.progress++;
            }
            
            // Check if all skill interactions have been done
            if (achievements.skillMaster.progress >= achievements.skillMaster.total && !achievements.skillMaster.unlocked) {
                achievements.skillMaster.unlocked = true;
                showAchievementNotification(achievements.skillMaster);
            }
            
            saveAchievements();
            
            // Also count as an interactive element
            incrementInteractiveAchievement();
        });
    });
    
    // Track skill category filters
    const filterButtons = document.querySelectorAll('.skills-filter .filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Count as an interactive element
            incrementInteractiveAchievement();
        });
    });
}

/**
 * Track profile interactions
 */
function trackProfileInteractions() {
    // GitHub profile click
    const githubContainer = document.querySelector('.github-card');
    if (githubContainer) {
        githubContainer.addEventListener('click', () => {
            if (!achievements.networkingPro.unlocked) {
                achievements.networkingPro.unlocked = true;
                showAchievementNotification(achievements.networkingPro);
                saveAchievements();
            }
            
            // Also count as an interactive element
            incrementInteractiveAchievement();
        });
    }
    
    // LeetCode profile click
    const leetcodeContainer = document.querySelector('.leetcode-card');
    if (leetcodeContainer) {
        leetcodeContainer.addEventListener('click', () => {
            if (!achievements.networkingPro.unlocked) {
                achievements.networkingPro.unlocked = true;
                showAchievementNotification(achievements.networkingPro);
                saveAchievements();
            }
            
            // Also count as an interactive element
            incrementInteractiveAchievement();
        });
    }
}

/**
 * Track contact form interactions
 */
function trackContactInteractions() {
    const contactForm = document.querySelector('#contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // If form is valid when submitted
            const isValid = Array.from(contactForm.elements)
                .filter(el => el.type !== 'submit')
                .every(el => el.validity.valid);
                
            if (isValid && !achievements.communicator.unlocked) {
                achievements.communicator.unlocked = true;
                showAchievementNotification(achievements.communicator);
                saveAchievements();
            }
            
            // Also count as an interactive element
            incrementInteractiveAchievement();
        });
    }
}

/**
 * Increment the interactive elements achievement counter
 */
function incrementInteractiveAchievement() {
    if (!achievements.interactive.unlocked) {
        achievements.interactive.progress++;
        
        if (achievements.interactive.progress >= achievements.interactive.total) {
            achievements.interactive.unlocked = true;
            showAchievementNotification(achievements.interactive);
        }
        
        saveAchievements();
    }
}

/**
 * Track time spent on the portfolio
 */
function startTimeTracking() {
    if (achievements.dedicated.unlocked) return;
    
    const timeInterval = setInterval(() => {
        if (document.visibilityState === 'visible') {
            achievements.dedicated.progress++;
            
            if (achievements.dedicated.progress >= achievements.dedicated.total) {
                achievements.dedicated.unlocked = true;
                showAchievementNotification(achievements.dedicated);
                saveAchievements();
                clearInterval(timeInterval);
            } else if (achievements.dedicated.progress % 10 === 0) {
                // Save progress every 10 seconds
                saveAchievements();
            }
        }
    }, 1000);
}

/**
 * Setup the easter egg
 */
function setupEasterEgg() {
    if (achievements.easterEgg.unlocked) return;
    
    // Konami code easter egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            
            if (konamiIndex === konamiCode.length) {
                // Konami code completed!
                achievements.easterEgg.unlocked = true;
                showAchievementNotification(achievements.easterEgg);
                saveAchievements();
                
                // Do something fun when the easter egg is found
                activateEasterEgg();
                
                // Reset index
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

/**
 * Activate the easter egg effect
 */
function activateEasterEgg() {
    // Create a fun visual effect when the easter egg is found
    const canvas = document.createElement('canvas');
    canvas.id = 'easter-egg-canvas';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    
    // Create code-like particles
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 20 + 10,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`,
            text: String.fromCharCode(33 + Math.floor(Math.random() * 94)),
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            rotation: Math.random() * 360
        });
    }
    
    // Animate particles
    let frameId;
    function animate() {
        frameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rotation * Math.PI / 180);
            
            ctx.font = `${p.size}px monospace`;
            ctx.fillStyle = p.color;
            ctx.fillText(p.text, 0, 0);
            
            ctx.restore();
            
            p.x += p.speedX;
            p.y += p.speedY;
            p.rotation += 1;
            
            // Reset position if off-screen
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Randomly change character
            if (Math.random() < 0.01) {
                p.text = String.fromCharCode(33 + Math.floor(Math.random() * 94));
            }
        });
    }
    
    animate();
    
    // Remove the effect after 5 seconds
    setTimeout(() => {
        cancelAnimationFrame(frameId);
        document.body.removeChild(canvas);
    }, 5000);
}

/**
 * Show achievement notification
 * @param {Object} achievement - The achievement that was unlocked
 */
function showAchievementNotification(achievement) {
    const notification = document.createElement('div');
    notification.className = 'achievement-notification';
    notification.innerHTML = `
        <div class="achievement-icon">
            <i class="${achievement.icon}"></i>
        </div>
        <div class="achievement-details">
            <h3>Achievement Unlocked!</h3>
            <h4>${achievement.name}</h4>
            <p>${achievement.description}</p>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate notification in
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Remove notification after delay
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
    
    // Refresh achievements panel if open
    if (document.getElementById('achievements-panel').classList.contains('active')) {
        populateAchievements();
    }
    
    // Update button to show new achievements
    const achievementsButton = document.getElementById('achievements-button');
    achievementsButton.classList.add('new-achievement');
    
    // Remove indicator when panel is opened
    achievementsButton.addEventListener('click', () => {
        achievementsButton.classList.remove('new-achievement');
    }, { once: true });
}

// Initialize achievements when DOM is loaded
document.addEventListener('DOMContentLoaded', initAchievements);
