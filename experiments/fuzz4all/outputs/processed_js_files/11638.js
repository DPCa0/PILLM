 

const fetchData = async (urls) => {
  try {
    const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
    
     
    const responses = await Promise.all(fetchPromises);
    
     
    responses.forEach(({ id, title, body }) => {
      print(`ID: ${id}, Title: ${title}, Body: ${body}`);
    });
    
     
    const uniqueTitles = new Set(responses.map(({ title }) => title));
    print(`Unique Titles Count: ${uniqueTitles.size}`);
    
     
    const mergedBodies = responses.reduce((acc, { body }) => [...acc, ...body.split(' ')], []);
    print(`Merged Body Word Count: ${mergedBodies.length}`);
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

fetchData(urls);
