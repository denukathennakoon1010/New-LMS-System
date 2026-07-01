// ============================================
// 🎯 API CONFIGURATION
// ============================================

// ✅ ONLINE (Railway) - ඔබගේ Railway URL එක මෙතන දාන්න
const API_URL = 'https://lms-system-backend-service.up.railway.app/api/auth';

// ❌ LOCAL (Development) - මෙය Local එකේ Test කරන්න ඕනේ නම් මෙය භාවිතා කරන්න
// const API_URL = 'http://localhost:5000/api/auth';

// ============================================
// 📝 REGISTER - New User Registration
// ============================================
async function registerUser(userData) {
    try {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();
        
        if (data.success) {
            // Save token and user data to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show success message
            showMessage('✅ ' + data.message, 'success');
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Show error message from server
            showMessage('❌ ' + data.message, 'error');
        }
    } catch (error) {
        console.error('Registration Error:', error);
        showMessage('❌ Cannot connect to server. Please check:\n1. Internet connection\n2. Backend server is running\n3. API URL is correct', 'error');
    }
}

// ============================================
// 🔑 LOGIN - User Login
// ============================================
async function loginUser(username, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();
        
        if (data.success) {
            // Save token and user data
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show success message
            showMessage('✅ ' + data.message, 'success');
            
            // Redirect to dashboard after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1500);
        } else {
            // Show error message from server
            showMessage('❌ ' + data.message, 'error');
            
            // Clear password field
            document.getElementById('password').value = '';
            document.getElementById('password').focus();
        }
    } catch (error) {
        console.error('Login Error:', error);
        showMessage('❌ Cannot connect to server. Please check:\n1. Internet connection\n2. Backend server is running\n3. API URL is correct', 'error');
    }
}

// ============================================
// 📨 SHOW MESSAGE - Display message to user
// ============================================
function showMessage(text, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    // Auto-hide message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageDiv.className = 'message';
            messageDiv.textContent = '';
        }, 5000);
    }
}

// ============================================
// 🖱️ LOGIN FORM HANDLER
// ============================================
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Validate inputs
    if (username === '' || password === '') {
        showMessage('⚠️ Please enter both username and password!', 'error');
        return;
    }

    // Call login function
    loginUser(username, password);
});

// ============================================
// 🔗 REGISTER LINK - Simple registration form
// ============================================
document.getElementById('registerLink').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Get user details via prompts (simple way)
    const fullName = prompt('👤 Enter your full name:');
    if (!fullName || fullName.trim() === '') {
        showMessage('❌ Full name is required!', 'error');
        return;
    }
    
    const email = prompt('📧 Enter your email address:');
    if (!email || email.trim() === '') {
        showMessage('❌ Email is required!', 'error');
        return;
    }
    
    // Simple email validation
    if (!email.includes('@') || !email.includes('.')) {
        showMessage('❌ Please enter a valid email address!', 'error');
        return;
    }
    
    const username = prompt('👤 Choose a username (min 3 characters):');
    if (!username || username.trim().length < 3) {
        showMessage('❌ Username must be at least 3 characters!', 'error');
        return;
    }
    
    const password = prompt('🔒 Choose a password (min 6 characters):');
    if (!password || password.length < 6) {
        showMessage('❌ Password must be at least 6 characters!', 'error');
        return;
    }
    
    const classInput = prompt('📚 Enter your class (e.g., Grade 10, Grade 11):');
    
    // Prepare user data
    const userData = {
        username: username.trim(),
        email: email.trim().toLowerCase(),
        password: password.trim(),
        fullName: fullName.trim(),
        class: classInput ? classInput.trim() : 'Not specified'
    };
    
    // Call register function
    registerUser(userData);
});

// ============================================
// ⌨️ ENTER KEY SUPPORT - Login on Enter
// ============================================
document.getElementById('password').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});

// ============================================
// 🔄 CHECK IF ALREADY LOGGED IN
// ============================================
const token = localStorage.getItem('token');
if (token) {
    // If token exists, redirect to dashboard
    window.location.href = 'dashboard.html';
}

// ============================================
// 🔗 FORGOT PASSWORD LINK (Coming Soon)
// ============================================
document.getElementById('forgotLink').addEventListener('click', function(e) {
    e.preventDefault();
    showMessage('🔧 Password reset feature coming soon!', 'error');
});

// ============================================
// 📝 CLEAR MESSAGE ON INPUT FOCUS
// ============================================
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        const messageDiv = document.getElementById('message');
        messageDiv.className = 'message';
        messageDiv.textContent = '';
    });
});

// ============================================
// 🌐 TEST API CONNECTION (Optional)
// ============================================
async function testConnection() {
    try {
        const response = await fetch('https://lms-system-backend-service.up.railway.app/api/health');
        const data = await response.json();
        console.log('✅ Server Status:', data);
        return true;
    } catch (error) {
        console.warn('⚠️ Server connection test failed:', error.message);
        return false;
    }
}

// Test connection when page loads
testConnection();