/**
 * Projects Page JavaScript
 * Handles project filtering and animations
 */
document.addEventListener('DOMContentLoaded', () => {
    initProjectFilters();
});

/**
 * Initialize project filtering functionality
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterBtns.length && projectCards.length) {
        // Add click event to filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Get the filter value
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    // First hide the card with animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        if (filter === 'all' || card.getAttribute('data-category').includes(filter)) {
                            card.style.display = 'block';
                            
                            // Then show it again with animation
                            setTimeout(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 50);
                        } else {
                            card.style.display = 'none';
                        }
                    }, 300);
                });
            });
        });
        
        // Initialize with 'all' filter
        const allFilter = document.querySelector('.filter-btn[data-filter="all"]');
        if (allFilter) {
            allFilter.click();
        }
    }
}
