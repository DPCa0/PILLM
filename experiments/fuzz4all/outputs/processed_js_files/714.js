 
import fetch from 'node-fetch';

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    
    const data = await response.json();
    const { name, description } = data;
    
    return { name, description };
  } catch (error) {
    console.error('Fetch error:', error);
    return { name: 'Unknown', description: 'No description available' };
  }
};

const processMultipleUrls = async (urls) => {
  const promises = urls.map(url => fetchData(url));
  const results = await Promise.allSettled(promises);

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      print(`Data from URL ${index + 1}:`, result.value);
    } else {
      print(`Error fetching URL ${index + 1}:`, result.reason);
    }
  });
};

const urls = [
  'https://api.github.com/repos/nodejs/node',
  'https://api.github.com/repos/facebook/react',
  'https://api.github.com/repos/vuejs/vue'
];

processMultipleUrls(urls);
