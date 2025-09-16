// User credentials
const validUser = {
    username: 'chefkoch@zumloewen.ch',
    password: 'Filet'
};

// Default user data
const defaultUserData = {
    name: 'Peter Müller',
    company: 'Zum Löwen',
    address: 'Dorfstrasse 1, 8274 Tägerwilen',
    email: 'chefkoch@zumloewen.ch'
};

// Load user data from localStorage or use defaults
function loadUserData() {
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : { ...defaultUserData };
}

// Save user data to localStorage
function saveUserData(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Populate form fields with saved data
function populateAccountForm() {
    const userData = loadUserData();
    const nameField = document.getElementById('name');
    const companyField = document.getElementById('company');
    const addressField = document.getElementById('address');
    const usernameField = document.getElementById('username');
    
    if (nameField) nameField.value = userData.name;
    if (companyField) companyField.value = userData.company;
    if (addressField) addressField.value = userData.address;
    if (usernameField) usernameField.value = userData.email;
}

// Update welcome message with current user name
function updateWelcomeMessage() {
    const userData = loadUserData();
    const welcomeElement = document.querySelector('.welcome-section h1');
    if (welcomeElement) {
        const firstName = userData.name.split(' ')[0];
        welcomeElement.textContent = `Willkommen zurück, ${firstName}`;
    }
}

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
    
    // Load user data for account page
    if (window.location.pathname.includes('account.html')) {
        populateAccountForm();
    }
    
    // Update welcome message on dashboard
    if (window.location.pathname.includes('dashboard.html')) {
        updateWelcomeMessage();
    }
    
    // Initialize new order page
    if (window.location.pathname.includes('new-order.html')) {
        updateCartTotal();
        updateOrderButtons();
    }
    
    // Add welcome message on dashboard
    if (window.location.pathname.includes('dashboard.html') || window.location.pathname === '/') {
        const isFirstLogin = !localStorage.getItem('hasLoggedInBefore');
        if (isFirstLogin) {
            setTimeout(() => {
                showToast('Willkommen in Ihrem Kundenportal, Peter!', 'success');
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
                    showToast('Anmeldung erfolgreich! Weiterleitung...', 'success');
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
    
    // Forgot password form handler
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = forgotPasswordForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = originalText + '<span class="loading"></span>';
            submitBtn.disabled = true;
            
            const email = document.getElementById('email').value;
            
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                showToast('Wiederherstellungslink wurde an ' + email + ' gesendet!', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }, 1500);
        });
    }
    
    // Account form handler
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const userData = {
                name: document.getElementById('name').value,
                company: document.getElementById('company').value,
                address: document.getElementById('address').value,
                email: document.getElementById('username').value
            };
            
            // Save to localStorage
            saveUserData(userData);
            
            showToast('Persönliche Informationen wurden gespeichert!', 'success');
        });
    }
    
    // Change password form handler
    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (currentPassword !== validUser.password) {
                showToast('Aktuelles Passwort ist falsch!', 'error');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                showToast('Neue Passwörter stimmen nicht überein!', 'error');
                return;
            }
            
            if (newPassword.length < 4) {
                showToast('Neues Passwort muss mindestens 4 Zeichen lang sein!', 'error');
                return;
            }
            
            // Update password (in real app, this would be sent to server)
            validUser.password = newPassword;
            showToast('Passwort wurde erfolgreich geändert!', 'success');
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 1500);
        });
    }
});

// Navigation functions
function goToLogin() {
    localStorage.removeItem('authenticated');
    showToast('Erfolgreich abgemeldet', 'info');
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
    showToast('Sie wurden abgemeldet', 'info');
    window.location.href = 'index.html';
}

// Dashboard functions
function newOrder() {
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = 'new-order.html';
    } else {
        window.location.href = 'index.html';
    }
}

function showDetails(orderNumber) {
    showToast('Bestelldetails werden geladen...', 'info');
    setTimeout(() => {
        alert('Details für Bestellung: ' + orderNumber + '\n\nDies würde eine detaillierte Ansicht der Bestellung öffnen.');
    }, 800);
}

function orderAgain(orderNumber) {
    showToast('Artikel werden zum Warenkorb hinzugefügt...', 'info');
    setTimeout(() => {
        alert('Erneut bestellen: ' + orderNumber + '\n\nDies würde die gleichen Artikel für eine neue Bestellung zum Warenkorb hinzufügen.');
    }, 800);
}

function changePassword() {
    if (localStorage.getItem('authenticated') === 'true') {
        window.location.href = 'change-password.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Table sorting function
function sortTable(columnIndex) {
    const table = document.getElementById('ordersTable');
    if (!table) return;
    
    showToast('Tabelle wird sortiert...', 'info');
    
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

// New Order functions
function changeQuantity(productId, change) {
    const qtyInput = document.getElementById('qty-' + productId);
    const currentQty = parseInt(qtyInput.value);
    const newQty = Math.max(0, Math.min(50, currentQty + change));
    
    qtyInput.value = newQty;
    updateCartTotal();
    updateOrderButtons();
}

function updateCartTotal() {
    let total = 0;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const price = parseInt(card.dataset.price);
        const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
        const quantity = parseInt(document.getElementById('qty-' + productId).value);
        total += price * quantity;
    });
    
    const totalElement = document.getElementById('cartTotal');
    if (totalElement) {
        totalElement.textContent = total + ' CHF';
        
        // Check if total exceeds budget
        const availableBudget = 3000; // This should come from user data
        if (total > availableBudget) {
            totalElement.style.color = '#dc3545';
            showToast('Warnung: Budget überschritten!', 'error');
        } else {
            totalElement.style.color = '#000';
        }
    }
}

function updateOrderButtons() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const placeOrderBtn = document.getElementById('placeOrderBtn');
    
    let hasItems = false;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
        const quantity = parseInt(document.getElementById('qty-' + productId).value);
        if (quantity > 0) {
            hasItems = true;
        }
    });
    
    if (addToCartBtn) addToCartBtn.disabled = !hasItems;
    if (placeOrderBtn) placeOrderBtn.disabled = !hasItems;
}

function addToCart() {
    const cartItems = [];
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
        const quantity = parseInt(document.getElementById('qty-' + productId).value);
        
        if (quantity > 0) {
            const title = card.querySelector('.product-title').textContent;
            const price = parseInt(card.dataset.price);
            const color = card.querySelector('input[name="color-' + productId + '"]:checked').value;
            
            cartItems.push({
                id: productId,
                title: title,
                quantity: quantity,
                price: price,
                color: color,
                total: price * quantity
            });
        }
    });
    
    if (cartItems.length > 0) {
        showToast('Artikel wurden zum Warenkorb hinzugefügt!', 'success');
        // In a real app, this would save to cart storage
        console.log('Cart items:', cartItems);
    }
}

function placeOrder() {
    const cartItems = [];
    let totalAmount = 0;
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
        const quantity = parseInt(document.getElementById('qty-' + productId).value);
        
        if (quantity > 0) {
            const title = card.querySelector('.product-title').textContent;
            const price = parseInt(card.dataset.price);
            const color = card.querySelector('input[name="color-' + productId + '"]:checked').value;
            const itemTotal = price * quantity;
            
            cartItems.push({
                id: productId,
                title: title,
                quantity: quantity,
                price: price,
                color: color,
                total: itemTotal
            });
            
            totalAmount += itemTotal;
        }
    });
    
    if (cartItems.length > 0) {
        // Check budget
        const availableBudget = 3000;
        if (totalAmount > availableBudget) {
            showToast('Bestellung kann nicht aufgegeben werden: Budget überschritten!', 'error');
            return;
        }
        
        showToast('Bestellung wird verarbeitet...', 'info');
        
        // Simulate order processing
        setTimeout(() => {
            showToast('Bestellung erfolgreich aufgegeben! Gesamtsumme: ' + totalAmount + ' CHF', 'success');
            
            // Reset form
            productCards.forEach(card => {
                const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
                document.getElementById('qty-' + productId).value = 0;
            });
            
            updateCartTotal();
            updateOrderButtons();
            
            // Redirect to dashboard after 2 seconds
            setTimeout(() => {
                goToDashboard();
            }, 2000);
        }, 1500);
    }
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