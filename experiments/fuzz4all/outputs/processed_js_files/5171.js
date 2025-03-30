 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    Math.random() > 0.5 ? resolve(`Data from ${url}`) : reject(`Failed to fetch from ${url}`);
  }, 1000);
});

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data3'
];

 
const fetchMultipleData = async (urls) => {
  try {
     
    const fetchPromises = [...urls.map(url => fetchData(url))];

     
    const results = await Promise.allSettled(fetchPromises);

     
    const successfulData = results
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);

     
    print('Fetched Data:', ...successfulData);
  } catch (error) {
     
    console.error('An error occurred:', error);
  }
};

 
fetchMultipleData(urls);
