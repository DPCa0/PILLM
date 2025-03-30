class ComplexSystem {
  constructor() {
    this.data = new Map();
  }

  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  }

  async populateData(urls) {
    try {
      const dataPromises = urls.map(url => this.fetchData(url));
      const results = await Promise.all(dataPromises);
      results.forEach((result, index) => {
        this.data.set(urls[index], result);
      });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  analyzeData() {
    return [...this.data.values()].reduce((summary, data) => {
      const keys = Object.keys(data);
      keys.forEach(key => {
        summary[key] = (summary[key] || 0) + (typeof data[key] === 'number' ? data[key] : 0);
      });
      return summary;
    }, {});
  }

  *[Symbol.iterator]() {
    for (const [url, data] of this.data) {
      yield { url, data };
    }
  }
}

(async () => {
  const urls = [
    "https://api.example.com/data1",
    "https://api.example.com/data2"
  ];

  const system = new ComplexSystem();
  await system.populateData(urls);

  print("Data Summary:", system.analyzeData());

  for (const { url, data } of system) {
    print("URL:", url);
    print("Data:", data);
  }
})();
