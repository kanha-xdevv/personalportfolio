/**
 * Portfolio Website Skills Section JavaScript
 * Author: John Doe
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    "use strict";

    // ===== VARIABLES =====
    let radarChart = null;
    const skillsSection = document.getElementById('skills');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const viewButtons = document.querySelectorAll('.view-btn');
    const barView = document.getElementById('bar-view');
    const radarView = document.getElementById('radar-view');
    const skillCategories = document.querySelectorAll('.skill-category');

    // ===== FUNCTIONS =====

    /**
     * Initialize the skills section functionality
     */
    function initSkills() {
        // Add event listeners to filter buttons
        filterButtons.forEach(button => {
            button.addEventListener('click', filterSkills);
        });
        
        // Add event listeners to view toggle buttons
        viewButtons.forEach(button => {
            button.addEventListener('click', toggleView);
        });
        
        // Initialize radar chart if view is visible
        if (document.querySelector('.skills-view.active') === radarView) {
            initRadarChart();
        }
    }

    /**
     * Filter skills based on the selected category
     * @param {Event} e - The click event
     */
    function filterSkills(e) {
        // Remove active class from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Get selected filter
        const filter = e.target.getAttribute('data-filter');
        
        // Show/hide skill categories based on filter
        skillCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');
            
            if (filter === 'all' || filter === categoryType) {
                category.style.display = 'block';
            } else {
                category.style.display = 'none';
            }
        });
        
        // Update radar chart if it's active and visible
        if (radarView.classList.contains('active') && radarChart) {
            updateRadarChart(filter);
        }
    }

    /**
     * Toggle between bar view and radar view
     * @param {Event} e - The click event
     */
    function toggleView(e) {
        // Remove active class from all buttons
        viewButtons.forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        e.target.classList.add('active');
        
        // Get selected view
        const view = e.target.getAttribute('data-view');
        
        // Toggle views
        if (view === 'bar') {
            barView.classList.add('active');
            radarView.classList.remove('active');
        } else {
            barView.classList.remove('active');
            radarView.classList.add('active');
            
            // Initialize or update radar chart
            if (!radarChart) {
                initRadarChart();
            } else {
                updateRadarChart();
            }
        }
    }

    /**
     * Initialize the radar chart
     */
    function initRadarChart() {
        // Get active filter
        const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        
        // Prepare data for radar chart
        const data = prepareRadarData(activeFilter);
        
        // Get the canvas element
        const ctx = document.getElementById('radar-chart').getContext('2d');
        
        // Create radar chart
        radarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Skills Proficiency',
                    data: data.values,
                    backgroundColor: 'rgba(88, 166, 255, 0.2)',
                    borderColor: 'rgba(88, 166, 255, 1)',
                    pointBackgroundColor: 'rgba(88, 166, 255, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(88, 166, 255, 1)'
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        pointLabels: {
                            color: 'rgba(240, 246, 252, 0.8)',
                            font: {
                                size: 12
                            }
                        },
                        ticks: {
                            display: false,
                            beginAtZero: true,
                            max: 100
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(22, 27, 34, 0.9)',
                        titleColor: 'rgba(240, 246, 252, 1)',
                        bodyColor: 'rgba(240, 246, 252, 0.8)',
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        },
                        bodyFont: {
                            size: 12
                        },
                        padding: 10,
                        cornerRadius: 8,
                        displayColors: false,
                        callbacks: {
                            title: function(context) {
                                return context[0].label;
                            },
                            label: function(context) {
                                return 'Proficiency: ' + context.raw + '%';
                            }
                        }
                    }
                },
                elements: {
                    line: {
                        borderWidth: 2
                    }
                }
            }
        });
    }

    /**
     * Update the radar chart based on the selected filter
     * @param {string} filter - The selected filter category
     */
    function updateRadarChart(filter) {
        if (!radarChart) return;
        
        // If filter is not provided, get the active filter
        if (!filter) {
            filter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
        }
        
        // Prepare data for radar chart
        const data = prepareRadarData(filter);
        
        // Update chart data
        radarChart.data.labels = data.labels;
        radarChart.data.datasets[0].data = data.values;
        
        // Update the chart
        radarChart.update();
    }

    /**
     * Prepare data for the radar chart based on the selected filter
     * @param {string} filter - The selected filter category
     * @returns {Object} - Object containing labels and values arrays
     */
    function prepareRadarData(filter) {
        const labels = [];
        const values = [];
        
        // Get all skill items
        skillCategories.forEach(category => {
            const categoryType = category.getAttribute('data-category');
            
            // Apply filter
            if (filter === 'all' || filter === categoryType) {
                // Get all skill items in this category
                const skillItems = category.querySelectorAll('.skill-item');
                
                skillItems.forEach(item => {
                    const name = item.querySelector('.skill-name').textContent;
                    const percentageText = item.querySelector('.skill-percentage').textContent;
                    const percentage = parseInt(percentageText);
                    
                    labels.push(name);
                    values.push(percentage);
                });
            }
        });
        
        return { labels, values };
    }

    /**
     * Animate skill bars based on their data-percentage attribute
     */
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage');
            
            // Trigger animation
            setTimeout(() => {
                bar.style.width = percentage + '%';
            }, 300);
        });
    }

    // Initialize skills section
    initSkills();
    
    // Make functions globally available
    window.animateSkillBars = animateSkillBars;
    window.updateRadarChart = updateRadarChart;
});
