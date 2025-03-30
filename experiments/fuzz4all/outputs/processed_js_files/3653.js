class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchJson() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
      return null;
    }
  }
}

const processData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchJson();
  
  if (data) {
     
    const result = data?.items?.map(item => item.value) ?? [];
    print('Processed Result:', result);

     
    logMessage`Data fetched with ${result.length} items`;
  }
};

function logMessage(strings, count) {
  print(`${strings[0]}${count}${strings[1]}`);
}

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const debouncedProcessData = debounce(processData, 300);

document.getElementById('fetch-button').addEventListener('click', () => {
  debouncedProcessData('https://api.example.com/data');
});

 
const SECRET_KEY = Symbol('secretKey');

class SecureData {
  constructor(secret) {
    this[SECRET_KEY] = secret;
  }

  getSecret() {
    return this[SECRET_KEY];
  }
}

const secureDataInstance = new SecureData('mySecret123');
print('Secure Data:', secureDataInstance.getSecret());
