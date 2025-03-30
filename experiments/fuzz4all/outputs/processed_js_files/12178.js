 
const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Sample data from ' + url });
      } else {
        reject(new Error('URL not provided'));
      }
    }, 1000);
  });
};

const processAsync = async () => {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
  try {
     
    const results = await Promise.all(urls.map(url => fetchData(url)));

     
    for (const { data } of results) {
      print(data);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processAsync();
