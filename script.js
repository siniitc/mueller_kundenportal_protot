// User credentials
const validUser = {
    username: 'chefkoch@zumloewen.ch',
    password: 'Filet'
};

// Debug logging for published version
console.log('Script loaded successfully');

// Default user data
const defaultUserData = {
    name: 'Peter Müller',
    company: 'Zum Löwen',
    address: 'Dorfstrasse 1, 8274 Tägerwilen',
    email: 'chefkoch@zumloewen.ch'
};

// Sample order data
const sampleOrders = [
    {
        id: 'ORD-2025-001',
        date: '15.01.2025',
        status: 'completed',
        total: 1000,
        items: [
            {
                id: 'lsz19',
                title: 'Latzschürze Premium',
                productNumber: 'Art.-Nr.: LSZ-19',
                quantity: 4,
                price: 85,
                color: 'Schwarz',
                total: 340,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/4044_6400_010_V-533x800.jpg'
            },
            {
                id: 'kh03',
                title: 'Herren Kochhose',
                productNumber: 'Art.-Nr.: KH-03',
                quantity: 3,
                price: 120,
                color: 'Schwarz',
                total: 360,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5321_8000_010_R_.jpg'
            },
            {
                id: 'bnd01',
                title: 'Bandana',
                productNumber: 'Art.-Nr.: BND-01',
                quantity: 12,
                price: 25,
                color: 'Schwarz',
                total: 300,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5710_6220_010-1.jpg'
            }
        ]
    },
    {
        id: 'ORD-2025-002',
        date: '28.02.2025',
        status: 'in-progress',
        total: 1000,
        items: [
            {
                id: 'kj16',
                title: 'Herren Kochjacke Langarm',
                productNumber: 'Art.-Nr.: KJ-16',
                quantity: 5,
                price: 150,
                color: 'Weiß',
                total: 750,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5581_8000_090_V.jpg'
            },
            {
                id: 'lsz18',
                title: 'Latzschürze Classic',
                productNumber: 'Art.-Nr.: LSZ-18',
                quantity: 2,
                price: 75,
                color: 'Braun',
                total: 150,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/LS-25_1_b_front.jpg'
            },
            {
                id: 'bnd01',
                title: 'Bandana',
                productNumber: 'Art.-Nr.: BND-01',
                quantity: 4,
                price: 25,
                color: 'Rot',
                total: 100,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5710_6220_010-1.jpg'
            }
        ]
    },
    {
        id: 'ORD-2025-003',
        date: '15.05.2025',
        status: 'completed',
        total: 1000,
        items: [
            {
                id: 'lsz19',
                title: 'Latzschürze Premium',
                productNumber: 'Art.-Nr.: LSZ-19',
                quantity: 6,
                price: 85,
                color: 'Weiß',
                total: 510,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/4044_6400_010_V-533x800.jpg'
            },
            {
                id: 'kh03',
                title: 'Herren Kochhose',
                productNumber: 'Art.-Nr.: KH-03',
                quantity: 2,
                price: 120,
                color: 'Grau',
                total: 240,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5321_8000_010_R_.jpg'
            },
            {
                id: 'kj16',
                title: 'Herren Kochjacke Langarm',
                productNumber: 'Art.-Nr.: KJ-16',
                quantity: 1,
                price: 150,
                color: 'Weiß',
                total: 150,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5581_8000_090_V.jpg'
            },
            {
                id: 'bnd01',
                title: 'Bandana',
                productNumber: 'Art.-Nr.: BND-01',
                quantity: 4,
                price: 25,
                color: 'Schwarz',
                total: 100,
                imageSrc: 'https://mueller-trade.com/wp-content/uploads/sites/2/5710_6220_010-1.jpg'
            }
        ]
    }
];

// Initialize order data in localStorage if not exists
function initializeOrderData() {
    if (!localStorage.getItem('orderHistory')) {
        localStorage.setItem('orderHistory', JSON.stringify(sampleOrders));
    }
}

// Get order history from localStorage
function getOrderHistory() {
    const orders = localStorage.getItem('orderHistory');
    return orders ? JSON.parse(orders) : sampleOrders;
}

// Get specific order by ID
function getOrderById(orderId) {
    const orders = getOrderHistory();
    return orders.find(order => order.id === orderId);
}
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
    
    console.log('Checking auth:', { isAuthenticated, currentPage, pathname: window.location.pathname });
    
    // Allow access to login page and error page when not authenticated
    const allowedPages = ['index.html', 'error.html', 'forgot-password.html', ''];
    if (!isAuthenticated && !allowedPages.includes(currentPage)) {
        console.log('Redirecting to login - not authenticated');
        window.location.href = 'index.html';
    }
}

// Login form handler
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    console.log('Current page:', window.location.pathname);
    
    // Check authentication on page load
    checkAuth();
    
    // Initialize order data
    initializeOrderData();
    
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
        loadCartFromStorage();
        updateCartTotal();
        updateBasketIcon();
    }
    
    // Initialize order overview page
    if (window.location.pathname.includes('order-overview.html')) {
        loadOrderOverview();
    }
    
    // Initialize order details page
    if (window.location.pathname.includes('order-details.html')) {
        loadOrderDetails();
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
        console.log('Login form found');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted');
            
            // Add loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.innerHTML = originalText + '<span class="loading"></span>';
            submitBtn.disabled = true;
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            console.log('Login attempt:', { username, password });
            
            // Simulate loading time
            setTimeout(() => {
                if (username === validUser.username && password === validUser.password) {
                    console.log('Login successful');
                    localStorage.setItem('authenticated', 'true');
                    showToast('Anmeldung erfolgreich! Weiterleitung...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    console.log('Login failed');
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
    } else {
        console.log('Login form not found');
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
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                goToDashboard();
            }, 1500);
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
    if (localStorage.getItem('authenticated') === 'true') {
        localStorage.setItem('selectedOrderId', orderNumber);
        window.location.href = 'order-details.html';
    } else {
        window.location.href = 'index.html';
    }
}

function orderAgain(orderNumber) {
    if (localStorage.getItem('authenticated') === 'true') {
        const order = getOrderById(orderNumber);
        if (order) {
            // Clear current cart and add order items
            currentCart = [...order.items];
            localStorage.setItem('currentCart', JSON.stringify(currentCart));
            showToast('Artikel wurden zum Warenkorb hinzugefügt!', 'success');
            setTimeout(() => {
                window.location.href = 'new-order.html';
            }, 1000);
        }
    } else {
        window.location.href = 'index.html';
    }
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
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('currentCart');
    if (savedCart) {
        currentCart = JSON.parse(savedCart);
        // Populate form fields with cart data
        currentCart.forEach(item => {
            const qtyInput = document.getElementById('qty-' + item.id);
            if (qtyInput) {
                qtyInput.value = item.quantity;
                
                // Set color selection
                const colorRadio = document.querySelector(`input[name="color-${item.id}"][value="${item.color}"]`);
                if (colorRadio) {
                    colorRadio.checked = true;
                }
            }
        });
    }
}

function changeQuantity(productId, change) {
    const qtyInput = document.getElementById('qty-' + productId);
    const currentQty = parseInt(qtyInput.value);
    const newQty = Math.max(0, Math.min(50, currentQty + change));
    
    qtyInput.value = newQty;
    updateCartTotal();
    updateOrderButtons();
}

function removeItem(productId) {
    const qtyInput = document.getElementById('qty-' + productId);
    qtyInput.value = 0;
    
    // Reset color selection to first option
    const firstColorRadio = document.querySelector(`input[name="color-${productId}"]`);
    if (firstColorRadio) {
        firstColorRadio.checked = true;
    }
    
    updateCartTotal();
    updateOrderButtons();
    showToast('Artikel wurde entfernt', 'info');
}

function updateOrderButtons() {
    const confirmBtn = document.getElementById('confirmOrderBtn');
    
    if (confirmBtn) {
        // Always enable the button so users can repeat exact orders
        confirmBtn.disabled = false;
        confirmBtn.style.opacity = '1';
        confirmBtn.style.cursor = 'pointer';
    }
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
    
    // Filter out items with quantity 0
    const filteredCart = cart.filter(item => item.quantity > 0);
    
    if (filteredCart.length > 0) {
        const totalAmount = filteredCart.reduce((sum, item) => sum + item.total, 0);
        
        // Check budget
        const availableBudget = 3000;
        if (totalAmount > availableBudget) {
            showToast('Bestellung kann nicht aufgegeben werden: Budget überschritten!', 'error');
            return;
        }
        
        showToast('Bestellung wird verarbeitet...', 'info');
        
        // Simulate order processing
        setTimeout(() => {
            // Create new order
            const newOrder = {
                id: 'ORD-' + new Date().getFullYear() + '-' + String(Date.now()).slice(-3),
                date: new Date().toLocaleDateString('de-DE'),
                status: 'in-progress',
                total: totalAmount,
                items: [...filteredCart]
            };
            
            // Add to order history
            const orders = getOrderHistory();
            orders.unshift(newOrder);
            localStorage.setItem('orderHistory', JSON.stringify(orders));
            
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

// Order details functions
function loadOrderDetails() {
    const orderId = localStorage.getItem('selectedOrderId');
    if (!orderId) {
        goToDashboard();
        return;
    }
    
    const order = getOrderById(orderId);
    if (!order) {
        showToast('Bestellung nicht gefunden', 'error');
        goToDashboard();
        return;
    }
    
    // Update page title and header
    document.title = `Kundenportal - Bestelldetails ${order.id}`;
    const headerElement = document.querySelector('.order-details-header h1');
    if (headerElement) {
        headerElement.textContent = `Bestelldetails ${order.id}`;
    }
    
    // Update order info
    const orderInfoElement = document.querySelector('.order-info');
    if (orderInfoElement) {
        const statusClass = order.status === 'completed' ? 'completed' : 'in-progress';
        const statusText = order.status === 'completed' ? 'abgeschlossen' : 'in Bearbeitung';
        
        orderInfoElement.innerHTML = `
            <div class="order-info-item">
                <span class="order-info-label">Bestellnummer:</span>
                <span class="order-info-value">${order.id}</span>
            </div>
            <div class="order-info-item">
                <span class="order-info-label">Datum:</span>
                <span class="order-info-value">${order.date}</span>
            </div>
            <div class="order-info-item">
                <span class="order-info-label">Status:</span>
                <span class="status ${statusClass}">${statusText}</span>
            </div>
            <div class="order-info-item">
                <span class="order-info-label">Gesamtsumme:</span>
                <span class="order-info-value">${order.total} CHF</span>
            </div>
        `;
    }
    
    // Update items list
    const itemsContainer = document.querySelector('.order-details-items');
    if (itemsContainer) {
        let itemsHTML = '';
        
        order.items.forEach(item => {
            itemsHTML += `
                <div class="order-detail-item">
                    <div class="order-detail-item-image">
                        <img src="${item.imageSrc}" alt="${item.title}" 
                             onerror="this.src='https://images.pexels.com/photos/6205509/pexels-photo-6205509.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'">
                    </div>
                    <div class="order-detail-item-info">
                        <div class="order-detail-item-name">${item.title}</div>
                        <div class="order-detail-item-details">${item.productNumber}</div>
                        <div class="order-detail-item-details">Farbe: ${item.color}</div>
                        <div class="order-detail-item-details">Menge: ${item.quantity}</div>
                        <div class="order-detail-item-details">Einzelpreis: ${item.price} CHF</div>
                    </div>
                    <div class="order-detail-item-price">
                        ${item.total} CHF
                    </div>
                </div>
            `;
        });
        
        itemsHTML += `
            <div class="order-details-total">
                <span class="order-details-total-label">Gesamtsumme: ${order.total} CHF</span>
            </div>
        `;
        
        itemsContainer.innerHTML = itemsHTML;
    }
}

function reorderFromDetails() {
    const orderId = localStorage.getItem('selectedOrderId');
    if (!orderId) {
        goToDashboard();
        return;
    }
    
    orderAgain(orderId);
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