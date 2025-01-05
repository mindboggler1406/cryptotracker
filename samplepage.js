async function fetchBitcoinData() {
  const url = 'https://api.coingecko.com/api/v3/coins/bitcoin';

      const response = await fetch(url);
      const data = await response.json();
      const price = data.market_data.current_price.usd;
      const marketCap = data.market_data.market_cap.usd;
      const priceChange24h = data.market_data.price_change_percentage_24h;
      const volume24h = data.market_data.total_volume.usd;
      const circulatingSupply = data.market_data.circulating_supply;
      const maxSupply = data.market_data.max_supply;
      const ath = data.market_data.ath.usd;
      const atl = data.market_data.atl.usd;

      document.getElementById('current-price').innerText = `$${price.toFixed(2)}`;
      document.getElementById('market-cap').innerText = `$${marketCap.toFixed(2)}`;
      document.getElementById('price-change-24h').innerText = `${priceChange24h.toFixed(2)}%`;
      document.getElementById('volume-24h').innerText = `$${volume24h.toFixed(2)}`;
      document.getElementById('circulating-supply').innerText = `${circulatingSupply.toFixed(2)} BTC`;
      document.getElementById('max-supply').innerText = `${maxSupply ? maxSupply.toFixed(2) : 'N/A'} BTC`;
      document.getElementById('ath').innerText = `$${ath.toFixed(2)}`;
      document.getElementById('atl').innerText = `$${atl.toFixed(2)}`;
 
}

const API_KEY = 'b1352fd2904f418294d9eb27025708a3';
const endpoint = 'https://newsapi.org/v2/everything';
const newsContainer = document.getElementById('news-item');

async function fetchCryptoNews() {
    try {
        const params = new URLSearchParams({
            q: 'bitcoin OR BTC',
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: API_KEY,
        });

        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            newsContainer.innerHTML = data.articles
                .map(article => `
                    
                       <a href="#" class="news-title">${article.title}</a>
                        <p>${article.description}</p>
                    
                `)
                .join('');
        } else {
            newsContainer.innerHTML = '<p>No news found.</p>';
        }
    } catch (error) {
        console.error('Error fetching crypto news:', error);
        newsContainer.innerHTML = '<p>Failed to load news. Please try again later.</p>';
    }
}

window.onload = () => {
  fetchBitcoinData();
  fetchCryptoNews();
};
setInterval(fetchBitcoinData, 10000);