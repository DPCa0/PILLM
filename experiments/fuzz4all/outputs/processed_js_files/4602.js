(async () => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  class AdvancedFeature {
    #privateField = "I'm private";

    constructor(name) {
      this.name = name;
    }

    static *generateSequence(limit) {
      for (let i = 0; i <= limit; i++) {
        yield i;
      }
    }

    async #fetchData(url) {
      const response = await fetch(url);
      return await response.json();
    }

    async displayData() {
      try {
        const data = await this.#fetchData('https://jsonplaceholder.typicode.com/posts/1');
        print(`Data from private method for ${this.name}:`, data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    showPrivate() {
      print(`Accessing private field: ${this.#privateField}`);
    }
  }

  const main = async () => {
    const feature = new AdvancedFeature('Complex JS');

    feature.showPrivate();

    print('Generated sequence:');
    for (const num of AdvancedFeature.generateSequence(5)) {
      print(num);
      await delay(500);  
    }

    await feature.displayData();
  };

  await main();
})();
