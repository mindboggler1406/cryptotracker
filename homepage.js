export let cryptos = [
  { id: 'bitcoin', priceId: 'current-price-btc', marketCapId: 'market-cap-btc', priceChangeId: 'price-change-24h-btc', name:'Bitcoin', symbol:'BTC'},
  { id: 'ethereum', priceId: 'current-price-eth', marketCapId: 'market-cap-eth', priceChangeId: 'price-change-24h-eth', name:'Ethereum',symbol:'ETH' },
  { id: 'tether', priceId: 'current-price-usdt', marketCapId: 'market-cap-usdt', priceChangeId: 'price-change-24h-usdt', name:'Tether', symbol:'USDT' },
  {id: 'ripple', priceId: 'current-price-xrp', marketCapId: 'market-cap-xrp', priceChangeId: 'price-change-24h-xrp', name:'Ripple', symbol:'XRP' },
  { id: 'binancecoin', priceId: 'current-price-bnb', marketCapId: 'market-cap-bnb', priceChangeId: 'price-change-24h-bnb', name:'BNB', symbol:'BNB' },
  { id: 'solana', priceId: 'current-price-sol', marketCapId: 'market-cap-sol', priceChangeId: 'price-change-24h-sol', name:'Solana', symbol:'SOL' },
  { id: 'avalanche-2', priceId: 'current-price-avax', marketCapId: 'market-cap-avax', priceChangeId: 'price-change-24h-avax', name:'Avalanche', symbol:'AVAX' },
];

export let watchlistItems = [];
onLoad();

function onLoad() {
  let watchlistItemsStr = localStorage.getItem('watchlistItems');
  watchlistItems = watchlistItemsStr ? JSON.parse(watchlistItemsStr) : [];
}

function addWatchlistItem(cryptoId) {
  if (!watchlistItems.includes(cryptoId)) {
    watchlistItems.push(cryptoId);
    localStorage.setItem('watchlistItems', JSON.stringify(watchlistItems));
    console.log(`Added ${cryptoId} to watchlist`);
  } else {
    console.log(`${cryptoId} is already in the watchlist`);
  }
}

export async function fetchCryptoData(cryptoId, priceId, marketCapId, priceChangeId) {
  const url = `https://api.coingecko.com/api/v3/coins/${cryptoId}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const price = data.market_data.current_price.usd;
    const marketCap = data.market_data.market_cap.usd;
    const priceChange24h = data.market_data.price_change_percentage_24h;

    document.getElementById(priceId).innerText = `$${price.toFixed(2)}`;
    document.getElementById(marketCapId).innerText = `$${marketCap.toFixed(2)}`;
    document.getElementById(priceChangeId).innerText = `${priceChange24h.toFixed(2)}%`;
  } catch (error) {
    console.error(`Failed to fetch data for ${cryptoId}:`, error);
  }
}

 async function fetchAllCryptoData() {
  const fetchPromises = cryptos.map(crypto => 
    fetchCryptoData(crypto.id, crypto.priceId, crypto.marketCapId, crypto.priceChangeId)
  );

  await Promise.all(fetchPromises);
}


const API_KEY = 'b1352fd2904f418294d9eb27025708a3';
const endpoint = 'https://newsapi.org/v2/everything';
const newsContainer = document.getElementById('news-column');

async function fetchCryptoNews() {
    try {
        const params = new URLSearchParams({
            q: 'cryptocurrency OR bitcoin OR blockchain',
            language: 'en',
            sortBy: 'publishedAt',
            apiKey: API_KEY,
        });

        const response = await fetch(`${endpoint}?${params}`);
        const data = await response.json();

        if (data.articles && data.articles.length > 0) {
            newsContainer.innerHTML = data.articles
                .map(article => `
                    <div class="news-item">
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-article">${article.description}</p>
                    </div>
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





async function fetchMarketOverview() {
  const url = `https://api.coingecko.com/api/v3/global`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const totalMarketCap = data.data.total_market_cap.usd;
    const totalMarketCapElement = document.getElementById('total-market-cap');
    if (totalMarketCapElement) {
      totalMarketCapElement.innerText = `$${(totalMarketCap / 1e12).toFixed(2)} trillion`;
    } else {
      console.error('Element with ID "total-market-cap" not found.');
    }
  } catch (error) {
    console.error('Failed to fetch market overview:', error);
  }
}
 




window.onload = () => {
  onLoad();
  fetchAllCryptoData();
  fetchCryptoNews();
  fetchMarketOverview();
  cryptos.forEach(crypto => {
    const button = document.querySelector(`#watchlist-btn-${crypto.id}`);
    if (button) {
      button.addEventListener('click', () => addWatchlistItem(crypto.id));
    }
  });
};

setInterval(fetchAllCryptoData, 80000);
setInterval(fetchCryptoNews, 60000);


