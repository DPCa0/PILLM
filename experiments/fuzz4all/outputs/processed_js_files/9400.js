 

 
const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts';

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const processData = async () => {
  const data = await fetchData(apiEndpoint);

   
  const firstFivePosts = data.slice(0, 5);
  const titles = firstFivePosts.map(({ title }) => title);

   
  titles.forEach((title, index) => {
    print(`Post ${index + 1}: ${title}`);
  });
};

processData();
