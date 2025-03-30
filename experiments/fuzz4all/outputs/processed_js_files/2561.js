 

class FetchData {
  constructor(url) {
    this.url = url;
  }

  async getData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
}

async function processData(url) {
  const fetchData = new FetchData(url);
  const data = await fetchData.getData();

  if (data && Array.isArray(data)) {
    const processedData = data.map(({ id, title }) => ({
      identifier: id,
      headline: title.toUpperCase(),
    }));

    console.log(
      'Processed Data:',
      processedData.map(
        ({ identifier, headline }) => `ID: ${identifier}, Title: ${headline}`
      )
    );
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts';
processData(url);
