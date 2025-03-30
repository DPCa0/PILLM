 

class Fetcher {
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
      console.error('Fetch error:', error);
    }
  }
}

const processData = async (url) => {
  const fetcher = new Fetcher(url);
  const data = await fetcher.fetchData();
  
  if (data) {
    const { results } = data;
    results.forEach(({ name, height, mass }) => {
      print(`Name: ${name}, Height: ${height}, Mass: ${mass}`);
    });
  }
};

processData('https://swapi.dev/api/people/');
