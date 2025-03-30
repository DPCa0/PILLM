 

class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Error:', error);
      throw error;
    }
  }
}

function* dataProcessor(data) {
  for (let item of data) {
    yield { ...item, processed: true };
  }
}

async function processData(url) {
  const request = new NetworkRequest(url);

  try {
    const rawData = await request.fetchData();
    const processor = dataProcessor(rawData);

    for (let processedItem of processor) {
      print(processedItem);
    }
  } catch (error) {
    console.error('Processing Error:', error);
  }
}

processData('https://jsonplaceholder.typicode.com/posts');
