 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = async () => {
  try {
    const [user, posts] = await Promise.all([
      fetchData('https://jsonplaceholder.typicode.com/users/1'),
      fetchData('https://jsonplaceholder.typicode.com/posts?userId=1')
    ]);

    const { name, email } = user;
    print(`User: ${name}, Email: ${email}`);
    
    const titles = posts.map(({ title }) => title);
    
    print('Post Titles: ', ...titles);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

processData();
