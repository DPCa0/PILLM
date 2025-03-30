 

 
const fetchData = async (url) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(500);  
  return `Data from ${url}`;
};

 
const processUrls = async (urls) => {
  try {
    const fetchPromises = urls.map(url => fetchData(url));
    const results = await Promise.all(fetchPromises);

     
    const [first, ...others] = results;
    const capitalizedData = results.map(data => data.toUpperCase());

    print('First URL data:', first);
    print('Other URLs data:', others);
    print('Capitalized Data:', capitalizedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const urlSet = new Set(['http://api1.com', 'http://api2.com', 'http://api3.com']);
const urlsArray = Array.from(urlSet).map(url => `${url}/endpoint`);

processUrls(urlsArray);
