class NetworkRequest {
  #url;
  constructor(url) {
    this.#url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.#url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return this.#processData(data);
    } catch (error) {
      console.error('Fetch error: ', error);
    }
  }

  #processData(data) {
    return data.map(item => ({
      id: item.id,
      name: item.name.toUpperCase(),
      details: item.details?.substr(0, 50) || 'N/A',
    }));
  }
}

function debounce(fn, delay) {
  let timeoutID;
  return (...args) => {
    if (timeoutID) clearTimeout(timeoutID);
    timeoutID = setTimeout(() => fn(...args), delay);
  };
}

async function main() {
  const apiRequest = new NetworkRequest('https://jsonplaceholder.typicode.com/posts');
  const data = await apiRequest.fetchData();
  if (data) {
    console.table(data);
  }
}

const debouncedMain = debounce(main, 1000);
debouncedMain();
