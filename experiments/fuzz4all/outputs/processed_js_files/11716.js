class AdvancedFeatures {
  constructor() {
    this.value = 42;
  }

  *fibonacciGenerator(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
      [prev, curr] = [curr, prev + curr];
      yield curr;
    }
  }

  async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      let data = await response.json();
      print('Fetched data:', data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

  mapWithCallback(arr, callback) {
    return arr.map(callback);
  }

  async manipulateAndFetch() {
    const fibNumbers = [...this.fibonacciGenerator(5)];
    const manipulated = this.mapWithCallback(fibNumbers, n => n * this.value);
    print('Manipulated numbers:', manipulated);

    await this.fetchData('https://api.example.com/data');
  }
}

(async () => {
  const advFeatures = new AdvancedFeatures();
  await advFeatures.manipulateAndFetch();
})();
