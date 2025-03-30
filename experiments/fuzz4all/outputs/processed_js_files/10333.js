class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
      throw error;
    }
  }
}

const debounce = (func, wait) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
};

const processResults = (data) => {
  const filtered = data.filter(item => item.value > 50);
  print('Filtered Results:', filtered);
};

const handleUserInput = debounce(async () => {
  const fetcher = new DataFetcher('https://api.example.com/data');
  try {
    const data = await fetcher.fetchData();
    processResults(data);
  } catch (error) {
    console.error('Error processing user input:', error);
  }
}, 300);

document.getElementById('inputField').addEventListener('input', handleUserInput);
