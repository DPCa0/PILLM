 
 

const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Alice',
          info: { age: 30, city: 'Wonderland' }
        },
        posts: [
          { id: 101, title: 'Hello World', likes: 5 },
          { id: 102, title: 'Adventures in JS', likes: 15 }
        ]
      });
    }, 1000);
  });

const processUserData = async () => {
  try {
    const data = await fetchData();
    const {
      user: { id, name, info: { age, city } },
      posts
    } = data;

    print(`User: ${name} (ID: ${id})`);
    print(`Age: ${age}, City: ${city}`);

    const postSummary = posts
      .map(({ id, title, likes }) => `Post ID: ${id}, Title: "${title}", Likes: ${likes}`)
      .join('\n');

    print('Posts:');
    print(postSummary);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processUserData();
