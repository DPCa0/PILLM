 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

 
const data = {
  name: 'John Doe',
  age: 30,
  location: 'Unknown'
};

 
const proxyData = new Proxy(data, handler);

 
(async () => {
  try {
     
    const [userData, postsData] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users/1'),
      fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

     
    print(`Name: ${proxyData.name}`);
    print(`Age: ${proxyData.age}`);

     
    const { name, email } = userData;
    print(`Fetched User: ${name}, Email: ${email}`);
    print(`Total Posts Fetched: ${postsData.length}`);

     
    const postTitles = postsData.map(post => post.title);
    const allTitles = [...postTitles];
    print('Post Titles:', allTitles);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
