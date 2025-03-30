 

 
const fetchData = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = {
      user: { id: 1, name: 'John Doe', age: 30 },
      posts: [
        { id: 1, title: 'Advanced JavaScript', content: 'Async, Promises, and more...' },
        { id: 2, title: 'Understanding Destructuring', content: 'Extract data with ease!' }
      ]
    };
    resolve(data);
  }, 1000);
});

 
const fetchAndLogData = async (url) => {
  try {
    const { user, posts } = await fetchData(url);
    
    const { name, age } = user;
    print(`User: ${name}, Age: ${age}`);

    for (const { title, content } of posts) {
      print(`Title: ${title}, Content: ${content}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchAndLogData('https://api.example.com/data');
