import { post } from './api.js';

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await post('/auth/register', { username, password });
  if (response) {
    alert('Registration successful!');
    window.location.href = 'login.html';
  } else {
    alert('Registration failed. Please try again.');
  }
});
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const response = await post('/auth/login', { username, password });
  if (response) {
    localStorage.setItem('token', response.token); // Save the token
    alert('Login successful!');
    window.location.href = 'index.html';
  } else {
    alert('Login failed. Please try again.');
  }
});
