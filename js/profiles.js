/**
 * Portfolio Website Profiles Section JavaScript
 * Author: John Doe
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ===== VARIABLES =====
    const githubUsername = 'johndoe'; // Replace with your actual GitHub username
    const leetcodeUsername = 'johndoe'; // Replace with your actual LeetCode username
    const githubDataContainer = document.getElementById('github-data');
    const leetcodeDataContainer = document.getElementById('leetcode-data');

    // ===== FUNCTIONS =====

    /**
     * Initialize the profiles section functionality
     */
    function initProfiles() {
        // Fetch GitHub profile data
        fetchGithubProfile();
        
        // Fetch LeetCode profile data
        fetchLeetcodeProfile();
    }

    /**
     * Fetch GitHub profile and repository data
     */
    function fetchGithubProfile() {
        if (!githubDataContainer) return;

        // GitHub API URLs
        const userApiUrl = `https://api.github.com/users/${githubUsername}`;
        const reposApiUrl = `https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=5`;
        
        // Show loading state
        githubDataContainer.innerHTML = `
            <div class="profile-loading">
                <div class="spinner"></div>
                <p>Loading GitHub data...</p>
            </div>
        `;
        
        // Fetch user profile and repositories in parallel
        Promise.all([
            fetch(userApiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
                }
                return response.json();
            }),
            fetch(reposApiUrl).then(response => {
                if (!response.ok) {
                    throw new Error(`GitHub API returned ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
        ])
        .then(([profileData, reposData]) => {
            // Format and display the fetched data
            displayGithubProfile(profileData, reposData);
        })
        .catch(error => {
            console.error('Error fetching GitHub data:', error);
            displayError(githubDataContainer, 'Failed to load GitHub profile', error.message);
        });
    }

    /**
     * Display GitHub profile and repositories data
     * @param {Object} profileData - User profile data from GitHub API
     * @param {Array} reposData - User repositories data from GitHub API
     */
    function displayGithubProfile(profileData, reposData) {
        const publicRepos = profileData.public_repos || 0;
        const followers = profileData.followers || 0;
        const following = profileData.following || 0;
        const name = profileData.name || githubUsername;
        const bio = profileData.bio || 'No bio available';
        
        // Create HTML content
        let html = `
            <div class="github-profile">
                <div class="profile-header-details">
                    <div class="profile-stats">
                        <div class="stat-item">
                            <span class="stat-value">${publicRepos}</span>
                            <span class="stat-label">Repositories</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-value">${following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                    <div class="profile-bio">
                        <p>${bio}</p>
                    </div>
                </div>
        `;
        
        // Add repositories section if we have repos
        if (reposData && reposData.length > 0) {
            html += `
                <div class="recent-repos">
                    <h4>Recent Repositories</h4>
                    <ul class="repos-list">
            `;
            
            // Add each repository
            reposData.forEach(repo => {
                const repoName = repo.name;
                const repoDescription = repo.description || 'No description available';
                const language = repo.language || 'N/A';
                const stars = repo.stargazers_count || 0;
                const forks = repo.forks_count || 0;
                
                html += `
                    <li class="repo-item">
                        <a href="${repo.html_url}" target="_blank" class="repo-name">${repoName}</a>
                        <p class="repo-description">${repoDescription}</p>
                        <div class="repo-meta">
                            <span class="repo-language">
                                <i class="fas fa-code"></i> ${language}
                            </span>
                            <span class="repo-stars">
                                <i class="fas fa-star"></i> ${stars}
                            </span>
                            <span class="repo-forks">
                                <i class="fas fa-code-branch"></i> ${forks}
                            </span>
                        </div>
                    </li>
                `;
            });
            
            html += `
                    </ul>
                </div>
            `;
        }
        
        html += '</div>';
        
        // Update the container with the generated HTML
        githubDataContainer.innerHTML = html;
        
        // Add styles for the GitHub profile section
        addGithubProfileStyles();
    }

    /**
     * Fetch LeetCode profile data
     * Note: LeetCode doesn't have an official public API
     * This function attempts to fetch data or shows an alternative UI
     */
    function fetchLeetcodeProfile() {
        if (!leetcodeDataContainer) return;
        
        // Show loading state
        leetcodeDataContainer.innerHTML = `
            <div class="profile-loading">
                <div class="spinner"></div>
                <p>Loading LeetCode data...</p>
            </div>
        `;
        
        // There is no official LeetCode API, so we'll use a fallback approach
        // In a real implementation, you might use a server-side proxy to scrape data
        // or use an unofficial API if available
        
        // For now, we'll display a static card after a simulated loading time
        setTimeout(() => {
            displayLeetcodeStaticProfile();
        }, 1500);
    }

    /**
     * Display static LeetCode profile UI with a message
     * This is used when the LeetCode API is not available
     */
    function displayLeetcodeStaticProfile() {
        const html = `
            <div class="leetcode-profile">
                <div class="profile-message">
                    <p>LeetCode profile statistics would appear here.</p>
                    <p>Connect your LeetCode account to display your latest achievements, solved problems, and contest ratings.</p>
                </div>
                <div class="leetcode-connect">
                    <button id="connect-leetcode" class="btn secondary-btn">
                        <i class="fas fa-link"></i> Connect LeetCode Account
                    </button>
                </div>
            </div>
        `;
        
        leetcodeDataContainer.innerHTML = html;
        
        // Add event listener to the connect button
        const connectButton = document.getElementById('connect-leetcode');
        if (connectButton) {
            connectButton.addEventListener('click', () => {
                alert('This would redirect to LeetCode authentication in a real implementation.');
            });
        }
        
        // Add styles for the LeetCode profile section
        addLeetcodeProfileStyles();
    }

    /**
     * Display error message in the container
     * @param {Element} container - The container element
     * @param {string} title - Error title
     * @param {string} message - Error message
     */
    function displayError(container, title, message) {
        container.innerHTML = `
            <div class="profile-error">
                <i class="fas fa-exclamation-circle"></i>
                <h4>${title}</h4>
                <p>${message}</p>
                <button class="btn secondary-btn retry-btn">
                    <i class="fas fa-sync-alt"></i> Retry
                </button>
            </div>
        `;
        
        // Add retry button functionality
        const retryBtn = container.querySelector('.retry-btn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                if (container === githubDataContainer) {
                    fetchGithubProfile();
                } else if (container === leetcodeDataContainer) {
                    fetchLeetcodeProfile();
                }
            });
        }
        
        // Add error styling
        addErrorStyles();
    }

    /**
     * Add CSS styles for GitHub profile section
     */
    function addGithubProfileStyles() {
        // Create a style element if it doesn't exist
        let styleElement = document.getElementById('profile-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'profile-styles';
            document.head.appendChild(styleElement);
        }
        
        // Add GitHub profile specific styles
        styleElement.textContent += `
            .github-profile {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
            }
            
            .profile-header-details {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }
            
            .profile-stats {
                display: flex;
                gap: var(--spacing-md);
                justify-content: space-around;
                margin-bottom: var(--spacing-sm);
            }
            
            .stat-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            
            .stat-value {
                font-size: var(--font-xl);
                font-weight: var(--font-weight-bold);
                color: var(--accent-color);
            }
            
            .stat-label {
                font-size: var(--font-sm);
                color: var(--text-light);
            }
            
            .profile-bio {
                text-align: center;
                padding: var(--spacing-sm);
                border-radius: var(--border-radius-sm);
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .recent-repos h4 {
                margin-bottom: var(--spacing-sm);
                font-size: var(--font-md);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                padding-bottom: var(--spacing-xs);
            }
            
            .repos-list {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-sm);
            }
            
            .repo-item {
                padding: var(--spacing-sm);
                border-radius: var(--border-radius-sm);
                background-color: rgba(255, 255, 255, 0.05);
                transition: var(--transition-normal);
            }
            
            .repo-item:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
            
            .repo-name {
                font-weight: var(--font-weight-bold);
                color: var(--accent-color);
                display: block;
                margin-bottom: var(--spacing-xs);
            }
            
            .repo-description {
                font-size: var(--font-sm);
                color: var(--text-light);
                margin-bottom: var(--spacing-xs);
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
            
            .repo-meta {
                display: flex;
                gap: var(--spacing-md);
                font-size: var(--font-xs);
                color: var(--text-light);
            }
            
            .repo-language i, .repo-stars i, .repo-forks i {
                margin-right: var(--spacing-xs);
            }
        `;
    }

    /**
     * Add CSS styles for LeetCode profile section
     */
    function addLeetcodeProfileStyles() {
        // Create a style element if it doesn't exist
        let styleElement = document.getElementById('profile-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'profile-styles';
            document.head.appendChild(styleElement);
        }
        
        // Add LeetCode profile specific styles
        styleElement.textContent += `
            .leetcode-profile {
                display: flex;
                flex-direction: column;
                gap: var(--spacing-md);
                align-items: center;
                text-align: center;
            }
            
            .profile-message {
                padding: var(--spacing-md);
                border-radius: var(--border-radius-sm);
                background-color: rgba(255, 255, 255, 0.05);
            }
            
            .profile-message p {
                margin-bottom: var(--spacing-sm);
            }
            
            .profile-message p:last-child {
                margin-bottom: 0;
                font-size: var(--font-sm);
                color: var(--text-light);
            }
            
            .leetcode-connect {
                margin-top: var(--spacing-sm);
            }
            
            #connect-leetcode {
                display: inline-flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
        `;
    }

    /**
     * Add CSS styles for error display
     */
    function addErrorStyles() {
        // Create a style element if it doesn't exist
        let styleElement = document.getElementById('profile-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'profile-styles';
            document.head.appendChild(styleElement);
        }
        
        // Add error styles
        styleElement.textContent += `
            .profile-error {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                text-align: center;
                padding: var(--spacing-lg);
            }
            
            .profile-error i {
                font-size: var(--font-xxl);
                color: var(--danger-color);
                margin-bottom: var(--spacing-md);
            }
            
            .profile-error h4 {
                font-size: var(--font-lg);
                margin-bottom: var(--spacing-sm);
            }
            
            .profile-error p {
                color: var(--text-light);
                margin-bottom: var(--spacing-lg);
                font-size: var(--font-sm);
            }
            
            .retry-btn {
                display: inline-flex;
                align-items: center;
                gap: var(--spacing-sm);
            }
        `;
    }

    // Initialize the profiles section
    initProfiles();
});
