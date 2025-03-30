 

const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(`Data from ${url}`);
    } else {
      reject(`Failed to fetch from ${url}`);
    }
  }, 1000);
});

const processUrls = async (urls) => {
  try {
     
    const [url1, url2, url3] = urls;
     
    const results = await Promise.all([fetchData(url1), fetchData(url2), fetchData(url3)]);
    
     
    const [result1, result2, result3] = results;
    print({ result1, result2, result3 });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const urls = ['https://api.example.com/data1', 'https://api.example.com/data2', 'https://api.example.com/data3'];
processUrls(urls);
