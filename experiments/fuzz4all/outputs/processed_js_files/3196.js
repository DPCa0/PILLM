 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { name: 'Alice', age: 25 }, posts: [{ id: 1, content: 'Hello World' }, { id: 2, content: 'JavaScript Rocks!' }] } });
    }, 1000);
  });
};

 
const complexOperation = async () => {
  try {
    const { data: { user, posts } } = await fetchData('https://api.example.com/data');
    
     
    const { name, age } = user;
    print(`User: ${name}, Age: ${age}`);

     
    const postContents = posts.map(({ id, content }) => `Post ${id}: ${content}`).join('\n');
    
     
    print(`Posts:\n${postContents}`);
    
     
    const words = new Set(posts.flatMap(({ content }) => content.split(' ')));
    print(`Unique words in posts: ${[...words].join(', ')}`);
  } catch (error) {
    console.error('Error in complex operation:', error);
  }
};

 
complexOperation();
