 
 

const fetchData = async (url) => {
  try {
     
    const response = await fetch(url);
    
     
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
     
    const data = await response.json();
    
     
    const { title, userId, body } = data;

     
    return `Post Title: ${title}\nUser ID: ${userId}\nContent: ${body}`;
  } catch (error) {
     
    console.error('Error fetching data:', error);
    return 'Failed to fetch data.';
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2'
];

 
const fetchMultipleData = async () => {
  const results = await Promise.all(urls.map(url => fetchData(url)));
  results.forEach(result => print(result));
};

 
fetchMultipleData();
