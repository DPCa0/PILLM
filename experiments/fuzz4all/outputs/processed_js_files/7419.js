 

 
const fetch = require('node-fetch');

(async function getCryptoPrices() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets', {
      method: 'GET',
      qs: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 5,
        page: 1,
        sparkline: false,
      },
    });
    const data = await response.json();

     
    data.forEach(({ name, current_price, market_cap }) => {
      console.log(
        `Cryptocurrency: ${name}\nCurrent Price: $${current_price.toFixed(2)}\nMarket Cap: $${market_cap.toLocaleString()}\n`
      );
    });
  } catch (error) {
    console.error('Error fetching crypto data:', error);
  }
})();

 
const validator = {
  set: function (obj, prop, value) {
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('Age must be an integer');
      }
      if (value < 0 || value > 150) {
        throw new RangeError('Age must be between 0 and 150');
      }
    }
    obj[prop] = value;
    return true;
  },
};

const person = new Proxy({}, validator);
person.name = 'Alice';
person.age = 30;  
 
 

print(person);

 
const cache = new Map();

const getOrSetCache = (key, compute) => {
  if (cache.has(key)) {
    print('Fetching from cache');
    return cache.get(key);
  }
  print('Computing value');
  const value = compute();
  cache.set(key, value);
  return value;
};

 
const computeValue = () => Math.random() * 100;

print(getOrSetCache('randomValue', computeValue));  
console