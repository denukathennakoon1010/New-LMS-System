// Login Form එක හසුරුවන්න
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // පිටුව reload වීම නවත්වන්න

    // Input කොටු වලින් අගයන් ගන්න
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    // සරල validation එකක්
    if (username === '' || password === '') {
        messageDiv.className = 'message error';
        messageDiv.textContent = '⚠️ කරුණාකර පරිශීලක නම සහ මුරපදය ඇතුලත් කරන්න!';
        return;
    }

    // මෙතනට ඔබගේ Database සමඟ සම්බන්ධ කිරීමේ කේතය පසුව එකතු කරන්න
    // දැනට මෙය demo එකක් ලෙස ක්‍රියා කරයි
    if (username === 'admin' && password === '1234') {
        messageDiv.className = 'message success';
        messageDiv.textContent = '✅ සාර්ථකයි! ඔබව හඳුනා ගන්නා ලදී. ඉක්මනින් මුල් පිටුවට යොමු කෙරේ...';
        
        // තත්පර 2කින් වෙනත් පිටුවකට යන්න (පසුව මෙය වෙනස් කරන්න)
        setTimeout(function() {
            alert('මෙතනින් ඔබගේ Dashboard එකට යන්න පුළුවන්');
        }, 2000);
    } else {
        messageDiv.className = 'message error';
        messageDiv.textContent = '❌ වැරදි පරිශීලක නම හෝ මුරපදයක්! නැවත උත්සාහ කරන්න.';
        
        // Input කොටු හිස් කරන්න
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
});

// Enter බොත්තම එබූ විට login වීම
document.getElementById('password').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('loginForm').dispatchEvent(new Event('submit'));
    }
});