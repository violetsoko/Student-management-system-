// ---------------------
// LOGIN PAGE
// ---------------------
const loginForm = document.getElementById('loginForm');

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        // Store token in localStorage
        localStorage.setItem('token', data.access_token);
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  });
}

// ---------------------
// DASHBOARD PAGE
// ---------------------
const dashboardContainer = document.getElementById('welcome');

if (dashboardContainer) {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Please log in first');
    window.location.href = 'index.html';
  } else {
    fetch('http://127.0.0.1:5000/dashboard', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          dashboardContainer.innerText = data.message;
        } else {
          alert('Invalid token. Please log in again.');
          localStorage.removeItem('token');
          window.location.href = 'index.html';
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error fetching dashboard data');
      });
  }
}

// ---------------------
// LOGOUT BUTTON 
// ---------------------
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
}
