 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url) {
      resolve(`Data from ${url}`);
    } else {
      reject('Invalid URL');
    }
  }, 1000);
});

 
const processData = (...data) => {
  return data.map(item => item.toUpperCase());
};

 
const loadData = async (urls) => {
  try {
    const promises = urls.map(url => fetchData(url));
    const results = await Promise.all(promises);
    print('Fetched Data:', results);

    const processedData = processData(...results);
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
loadData(urls);
