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

// Cart storage
let currentCart = [];

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
        updateBasketIcon();
    }
    
    // Initialize order overview page
    if (window.location.pathname.includes('order-overview.html')) {
        loadOrderOverview();
    }
    
    // Update basket icon on all pages
    const savedCart = localStorage.getItem('currentCart');
    if (savedCart) {
        currentCart = JSON.parse(savedCart);
        updateBasketIcon();
    }
    
    // Initialize order overview page
    if (window.location.pathname.includes('order-overview.html')) {
        loadOrderOverview();
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
    let itemCount = 0;
    currentCart = [];
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        const price = parseInt(card.dataset.price);
        const productId = card.querySelector('.quantity-controls input').id.replace('qty-', '');
        const quantity = parseInt(document.getElementById('qty-' + productId).value);
        
        if (quantity > 0) {
            const title = card.querySelector('.product-title').textContent;
            const color = card.querySelector('input[name="color-' + productId + '"]:checked').value;
            const productNumber = card.querySelector('.product-number').textContent;
            const imageSrc = card.querySelector('.product-img').src;
            
            currentCart.push({
                id: productId,
                title: title,
                productNumber: productNumber,
                quantity: quantity,
                price: price,
                color: color,
                total: price * quantity,
                imageSrc: imageSrc
            });
            
            total += price * quantity;
            itemCount += quantity;
        }
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
    
    updateBasketIcon();
}

function updateBasketIcon() {
    const basketCount = document.getElementById('basketCount');
    if (basketCount) {
        const totalItems = currentCart.reduce((sum, item) => sum + item.quantity, 0);
        basketCount.textContent = totalItems;
        basketCount.classList.toggle('hidden', totalItems === 0);
    }
}

function showOrderOverview() {
    if (localStorage.getItem('authenticated') === 'true') {
        // Save current cart to localStorage
        localStorage.setItem('currentCart', JSON.stringify(currentCart));
        window.location.href = 'order-overview.html';
    } else {
        window.location.href = 'index.html';
    }
}

function loadOrderOverview() {
    const savedCart = localStorage.getItem('currentCart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    const container = document.getElementById('orderItemsContainer');
    const actions = document.getElementById('orderOverviewActions');
    const totalElement = document.getElementById('overviewTotal');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-order">
                <p>Ihr Warenkorb ist leer</p>
                <button class="btn" onclick="newOrder()">Artikel auswählen</button>
            </div>
        `;
        actions.style.display = 'none';
        if (totalElement) totalElement.textContent = '0 CHF';
        return;
    }
    
    let totalAmount = 0;
    let itemsHTML = '';
    
    cart.forEach(item => {
        totalAmount += item.total;
        itemsHTML += `
            <div class="order-item">
                <div class="order-item-image">
                    <img src="${item.imageSrc}" alt="${item.title}" 
                         onerror="this.src='https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'">
                </div>
                <div class="order-item-info">
                    <div class="order-item-name">${item.title}</div>
                    <div class="order-item-details">${item.productNumber}</div>
                    <div class="order-item-details">Farbe: ${item.color}</div>
                    <div class="order-item-details">Menge: ${item.quantity}</div>
                </div>
                <div class="order-item-price">
                    ${item.total} CHF
                    <div class="order-item-unit-price">(${item.price} CHF/Stk.)</div>
                </div>
            </div>
        `;
    });
    
    itemsHTML += `
        <div class="order-overview-total">
            <span class="order-overview-total-label">Gesamtsumme: ${totalAmount} CHF</span>
        </div>
    `;
    
    container.innerHTML = itemsHTML;
    actions.style.display = 'flex';
    if (totalElement) {
        totalElement.textContent = totalAmount + ' CHF';
        
        // Check budget
        const availableBudget = 3000;
        if (totalAmount > availableBudget) {
            totalElement.style.color = '#dc3545';
        } else {
            totalElement.style.color = '#000';
        }
    }
    
    // Update basket icon
    updateBasketIcon();
}

function confirmOrder() {
    const savedCart = localStorage.getItem('currentCart');
    const cart = savedCart ? JSON.parse(savedCart) : [];
    
    if (cart.length > 0) {
        const totalAmount = cart.reduce((sum, item) => sum + item.total, 0);
        
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
            
            // Clear cart
            localStorage.removeItem('currentCart');
            
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