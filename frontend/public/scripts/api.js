const BASE_URL = 'http://<backend-ip>:3000'; // Replace with backend IP or domain

// Utility for GET requests
async function get(endpoint) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error(`GET ${endpoint} failed: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

// Utility for POST requests
async function post(endpoint, data, token = null) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`POST ${endpoint} failed: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
