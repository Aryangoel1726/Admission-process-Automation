/* ============================================
   Admission Process Automation — Client JS
   ============================================ */

const API_BASE = 'http://localhost:5000/api';

// --- Utility: API fetch wrapper ---
async function apiRequest(endpoint, method = 'GET', body = null) {
  const headers = { 'Content-Type': 'application/json' };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(`${API_BASE}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}

// --- Show / hide alert messages ---
function showAlert(elementId, message, type = 'error') {
  const alert = document.getElementById(elementId);
  if (!alert) return;
  alert.textContent = message;
  alert.className = `alert alert-${type}`;
  alert.style.display = 'block';

  if (type === 'success') {
    setTimeout(() => {
      alert.style.display = 'none';
    }, 4000);
  }
}

// --- Auth helpers ---
function saveAuth(data) {
  localStorage.setItem('token', data.token);
  localStorage.setItem('user', JSON.stringify(data));
}

function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/frontend/pages/login.html';
}

function isLoggedIn() {
  return !!localStorage.getItem('token');
}

// --- Registration form handler ---
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value,
      phone: form.phone.value.trim(),
      dateOfBirth: form.dateOfBirth.value,
      gender: form.gender.value,
    };

    try {
      const res = await apiRequest('/auth/register', 'POST', payload);
      saveAuth(res.data);
      showAlert('formAlert', 'Registration successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (err) {
      showAlert('formAlert', err.message);
    }
  });
}

// --- Login form handler ---
function initLoginForm() {
  const form = document.getElementById('loginForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
      const res = await apiRequest('/auth/login', 'POST', {
        email: form.email.value.trim(),
        password: form.password.value,
      });
      saveAuth(res.data);
      showAlert('formAlert', 'Login successful! Redirecting...', 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } catch (err) {
      showAlert('formAlert', err.message);
    }
  });
}

// --- Initialize on page load ---
document.addEventListener('DOMContentLoaded', () => {
  initRegisterForm();
  initLoginForm();

  // TODO: Initialize dashboard page
  // TODO: Initialize application form page
});
