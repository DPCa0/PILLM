class NetworkRequest {
  constructor(url) {
    this.url = url;
  }
  
  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }
}

const processAndDisplayData = async (url) => {
  try {
    const request = new NetworkRequest(url);
    const data = await request.fetchData();

    const transformedData = Object.entries(data).reduce((acc, [key, value]) => {
      if (typeof value === 'string') {
        acc[key.toUpperCase()] = value.trim();
      } else {
        acc[key] = value;
      }
      return acc;
    }, {});

    print('Transformed Data:', JSON.stringify(transformedData, null, 2));

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
};

const apiURL = 'https://jsonplaceholder.typicode.com/posts/1';
processAndDisplayData(apiURL);

 
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.dynamicProp = 'Hello, Proxy!';
