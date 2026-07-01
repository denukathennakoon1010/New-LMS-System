// Get the login form
const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

// Handle form submission
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload

    // Get input values and remove extra spaces
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Check if fields are empty
    if (username === '' || password === '') {
        messageDiv.className = 'message error';
        messageDiv.textContent = '⚠️ Please enter both username and password!';
        return;
    }

    // Demo login validation (you will connect to database later)
    if (username === 'admin' && password === '1234') {
        messageDiv.className = 'message success';
        messageDiv.textContent = '✅ Success! You have been identified. Redirecting to Dashboard...';
        
        // Redirect after 2 seconds (you can change this later)
        setTimeout(function() {
            alert('🎉 Welcome! This is where your Dashboard will appear.');
        }, 1500);
    } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = '❌ Invalid username or password! Please try again.';
        
        // Clear password field and focus
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

// Login when pressing Enter key on password field
document.getElementById('password').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        loginForm.dispatchEvent(new Event('submit'));
    }
});

// Clear message when user starts typing in any input
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        messageDiv.className = 'message';
        messageDiv.textContent = '';
    });
});