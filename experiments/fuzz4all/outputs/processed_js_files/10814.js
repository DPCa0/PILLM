const fetch = require('node-fetch');

class DataFetcher {
  #apiUrl;
  constructor(apiUrl) {
    this.#apiUrl = apiUrl;
  }

  async *fetchData() {
    let url = this.#apiUrl;
    while (url) {
      const response = await fetch(url);
      const data = await response.json();
      yield* data.results;
      url = data.next;
    }
  }
}

const transformData = async function* (asyncIterable, transformFn) {
  for await (const item of asyncIterable) {
    yield transformFn(item);
  }
};

(async () => {
  const apiUrl = 'https://swapi.dev/api/people';
  const dataFetcher = new DataFetcher(apiUrl);

  const transformedData = transformData(dataFetcher.fetchData(), person => ({
    name: person.name,
    birthYear: person.birth_year,
  }));

  const results = [];
  for await (const person of transformedData) {
    results.push(person);
    if (results.length >= 5) break;  
  }

  print(results);
})();
