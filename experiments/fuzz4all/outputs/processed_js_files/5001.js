 

async function fetchData(urls) {
   
  const fetchPromise = (url) =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        if (Math.random() > 0.1) {
          resolve(`Data from ${url}`);
        } else {
          reject(`Failed to fetch ${url}`);
        }
      }, 1000)
    );

   
  try {
    const results = await Promise.all(urls.map(url => fetchPromise(url)));
    return results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

const processData = (data) => {
   
  return data
    .map(item => item.toUpperCase())
    .reduce((acc, item) => acc + item.length, 0);
};

(async () => {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2', 'https://api.example.com/3'];
  try {
    const data = await fetchData(urls);
    const result = processData(data);
    print(`Total length of processed data: ${result}`);
  } catch (e) {
    console.error('Error in processing:', e);
  }
})();
