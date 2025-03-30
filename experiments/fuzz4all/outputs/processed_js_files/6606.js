 

const fetchData = async (urls) => {
   
  const uniqueUrls = new Set(urls);
  
   
  const fetchPromises = [...uniqueUrls].map(async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
    return response.json();
  });

  try {
     
    const results = await Promise.allSettled(fetchPromises);
    const successfulResults = results
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value);
    const errors = results
      .filter(({ status }) => status === 'rejected')
      .map(({ reason }) => reason);

    print('Successfully fetched data:', successfulResults);
    print('Errors occurred:', errors);
  } catch (error) {
    console.error('Unexpected error:', error);
  }
};

 
const urls = [
  'https://api.example.com/data1',
  'https://api.example.com/data2',
  'https://api.example.com/data1'  
];

fetchData(urls);
