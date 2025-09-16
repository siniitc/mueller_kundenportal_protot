// User credentials
const validUser = {
    username: 'Chefkoch',
    password: 'Filet'
};

// Toast notification function
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Check if user is authenticated
function checkAuth() {
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!isAuthenticated && currentPage !== 'index.html' && currentPage !== 'error.html' && currentPage !== '') {
        window.location.href = 'index.html';
    }
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication on page load
    checkAuth();
    
    // Add welcome message on dashboard
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname === '/') {
        const isFirstLogin = !localStorage.getItem('hasLoggedInBefore');
        if (isFirstLogin) {
            setTimeout(() => {
                showToast('Welcome to your Kundenportal, Peter!', 'success');
                localStorage.setItem('hasLoggedInBefore', 'true');
            }, 500);
        }
    }
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Add loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = originalText + '<span class="loading"></span>';
            submitBtn.disabled = true;
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Simulate loading time
            setTimeout(() => {
                if (username === validUser.username && password === validUser.password) {
                    localStorage.setItem('authenticated', 'true');
                    showToast('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    window.location.href = 'error.html';
                }
            }, 1500);
        });
        
        // Add input validation feedback
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = '#dc3545';
                } else {
                    this.style.borderColor = '#28a745';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#000';
            });
        });
    }
});

// Navigation functions
function goToLogin() {
    localStorage.removeItem('authenticated');
    showToast('Logged out successfully', 'info');
    window.location.href = 'index.html';
}

function goToDashboard() {
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = 'dashboard.html';
    } else {
        window.location.href = 'index.html';
    }
}

function goToAccount() {
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = 'account.html';
    } else {
        window.location.href = 'index.html';
    }
}

function logout() {
    localStorage.removeItem('authenticated');
    localStorage.removeItem('hasLoggedInBefore');
    showToast('You have been logged out', 'info');
    window.location.href = 'index.html';
}

// Dashboard functions
function newOrder() {
    showToast('Redirecting to order catalog...', 'info');
    setTimeout(() => {
        alert('New Order functionality - This would redirect to the order catalog page.');
    }, 1000);
}

function showDetails(orderNumber) {
    showToast('Loading order details...', 'info');
    setTimeout(() => {
        alert('Show details for order: ' + orderNumber + '\n\nThis would open a detailed view of the order.');
    }, 800);
}

function orderAgain(orderNumber) {
    showToast('Adding items to cart...', 'info');
    setTimeout(() => {
        alert('Order again: ' + orderNumber + '\n\nThis would add the same items to cart for a new order.');
    }, 800);
}

function changePassword() {
    showToast('Opening password change form...', 'info');
    setTimeout(() => {
        alert('Change Password functionality - This would open a password change form.');
    }, 800);
}

// Table sorting function
function sortTable(columnIndex) {
    const table = document.getElementById('ordersTable');
    if (!table) return;
    
    showToast('Sorting table...', 'info');
    
    const tbody = table.getElementsByTagName('tbody')[0];
    const rows = Array.from(tbody.rows);
    
    // Toggle sorting direction
    const isAscending = table.dataset.sortDirection !== 'asc';
    table.dataset.sortDirection = isAscending ? 'asc' : 'desc';
    
    rows.sort((a, b) => {
        const aValue = a.cells[columnIndex].textContent.trim();
        const bValue = b.cells[columnIndex].textContent.trim();
        
        // For date column (index 0), convert to comparable format
        if (columnIndex === 0) {
            const aDate = new Date(aValue.split('.').reverse().join('-'));
            const bDate = new Date(bValue.split('.').reverse().join('-'));
            return isAscending ? aDate - bDate : bDate - aDate;
        }
        
        // For other columns, simple string comparison
        if (isAscending) {
            return aValue.localeCompare(bValue);
        } else {
            return bValue.localeCompare(aValue);
        }
    });
    
    // Clear tbody and append sorted rows
    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
    
    // Update visual indicator
    updateSortIndicator(table, columnIndex, isAscending);
}

function updateSortIndicator(table, columnIndex, isAscending) {
    // Remove existing sort indicators
    const headers = table.querySelectorAll('th');
    headers.forEach(header => {
        header.textContent = header.textContent.replace(' ↑', '').replace(' ↓', '');
    });
    
    // Add sort indicator to current column
    const currentHeader = headers[columnIndex];
    currentHeader.textContent += isAscending ? ' ↑' : ' ↓';
}

// Add smooth scrolling for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to logout (when authenticated)
        if (e.key === 'Escape' && localStorage.getItem('authenticated') === 'true') {
            const confirmLogout = confirm('Press ESC again to logout');
            if (confirmLogout) {
                logout();
            }
        }
        
        // Enter key on login form
        if (e.key === 'Enter' && document.getElementById('loginForm')) {
            document.getElementById('loginForm').dispatchEvent(new Event('submit'));
        }
    });
});

// Prevent unauthorized access
window.addEventListener('load', function() {
    checkAuth();
});