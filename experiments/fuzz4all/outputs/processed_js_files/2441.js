 
class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      this.processData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

  processData(data) {
    const { items } = data;
    if (!Array.isArray(items)) throw new TypeError('Data is not an array');

    const results = items
      .filter(({ active }) => active)
      .map(({ name, value }) => ({ name, value: value * 2 }));

    this.displayResults(results);
  }

  displayResults(results) {
    const ul = document.createElement('ul');
    results.forEach(({ name, value }) => {
      const li = document.createElement('li');
      li.textContent = `${name}: ${value}`;
      ul.appendChild(li);
    });
    document.body.appendChild(ul);
  }
}

const fetcher = new DataFetcher('https://api.example.com/data');
fetcher.fetchData();
