import { get } from './api.js';

async function loadItems() {
  const items = await get('/items');
  const container = document.getElementById('items-container');

  if (items && items.length > 0) {
    container.innerHTML = items.map(item => `
      <div class="item">
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Starting Bid: $${item.startingBid}</p>
        <p>Current Bid: $${item.currentBid}</p>
        <a href="item.html?id=${item._id}">View Details</a>
      </div>
    `).join('');
  } else {
    container.innerHTML = '<p>No items available at the moment.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadItems);
async function loadItemDetails() {
    const params = new URLSearchParams(window.location.search);
    const itemId = params.get('id');
    const item = await get(`/items/${itemId}`);
    const details = document.getElementById('item-details');
  
    if (item) {
      details.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <p>Starting Bid: $${item.startingBid}</p>
        <p>Current Bid: $${item.currentBid}</p>
      `;
    } else {
      details.innerHTML = '<p>Item not found.</p>';
    }
  }
  
  document.addEventListener('DOMContentLoaded', loadItemDetails);
  
