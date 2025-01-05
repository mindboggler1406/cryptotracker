import { cryptos, fetchCryptoData } from './homepage.js';

let watchlistItems = [];

document.addEventListener('DOMContentLoaded', () => {
  loadWatchlistItems();
  displayWatchlistItems();
  fetchWatchlistData();
  document.querySelector('.watchlist-table').addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-btn')) {
      const cryptoId = event.target.getAttribute('data-crypto-id');
      removeFromWatchlist(cryptoId);
    }
  });
});

function loadWatchlistItems() {
  const watchlistItemsStr = localStorage.getItem('watchlistItems');
  watchlistItems = watchlistItemsStr ? JSON.parse(watchlistItemsStr) : [];
  console.log('Loaded watchlist items:', watchlistItems);
}

function displayWatchlistItems() {
  const containerElement = document.querySelector('.watchlist-table');
  let innerHTML = `
    <thead>
      <tr>
        <th>Cryptocurrency</th>
        <th>Price</th>
        <th>Market Cap</th>
        <th>Price Change 24h</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
  `;
  watchlistItems.forEach(cryptoId => {
    const crypto = cryptos.find(c => c.id === cryptoId);
    if (crypto) {
      innerHTML += generateItemHTML(crypto);
    }
  });
  innerHTML += '</tbody>';
  containerElement.innerHTML = innerHTML;
}

function removeFromWatchlist(cryptoId) {
  watchlistItems = watchlistItems.filter(watchlistItemId => watchlistItemId !== cryptoId);
  localStorage.setItem('watchlistItems', JSON.stringify(watchlistItems));
  displayWatchlistItems();
  fetchWatchlistData();
}

function generateItemHTML(crypto) {
  return `
    <tr>
      <td><a class="watchlist-names" href="samplepages/${crypto.name}.html">${crypto.name} (${crypto.symbol})</a></td>
      <td id="current-price-${crypto.id}">$0.00</td>
      <td id="market-cap-${crypto.id}">$0.00</td>
      <td id="price-change-24h-${crypto.id}" class="price-up">0.00%</td>
      <td>
        <button class="action-btn remove-btn" data-crypto-id="${crypto.id}">Remove</button>
      </td>
    </tr>
  `;
}

async function fetchWatchlistData() {
  const fetchPromises = watchlistItems.map(cryptoId => {
    const crypto = cryptos.find(c => c.id === cryptoId);
    if (crypto) {
      return fetchCryptoData(crypto.id, `current-price-${crypto.id}`, `market-cap-${crypto.id}`, `price-change-24h-${crypto.id}`);
    }
  });

  await Promise.all(fetchPromises);
}

setInterval(fetchWatchlistData, 80000);