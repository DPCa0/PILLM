 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData(url) {
  await delay(1000);  
  if (Math.random() < 0.3) throw new Error('Network Error');
  return { data: 'Sample Data from ' + url };
}

 
async function fetchDataWithRetry(url, retries = 3) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      print(`Attempt ${attempt + 1} for ${url}`);
      const response = await fetchData(url);
      print('Data fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      if (attempt === retries) throw new Error('Max retries reached');
      attempt++;
      const backoffTime = Math.pow(2, attempt) * 100;
      print(`Retrying in ${backoffTime} ms...`);
      await delay(backoffTime);
    }
  }
}

 
async function main() {
  const urls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  
  try {
    const results = await Promise.all(urls.map(url => fetchDataWithRetry(url)));
    print('All data fetched:', results);
  } catch (error) {
    console.error('Failed to fetch all data:', error.message);
  }
}

main();
