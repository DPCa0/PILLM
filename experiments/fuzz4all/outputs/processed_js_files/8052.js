const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const mapData = new Map();

const processFetchedData = async (url) => {
  try {
    if (!mapData.has(url)) {
      const data = await fetchData(url);
      mapData.set(url, data);
    }
    const data = mapData.get(url);
    print(`Processed data for ${url}:`, data);
  } catch (error) {
    console.error('Processing error:', error);
  }
};

const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];

urls.forEach((url, index) => {
  setTimeout(
    debounce(() => processFetchedData(url), 300),
    index * 500
  );
});
