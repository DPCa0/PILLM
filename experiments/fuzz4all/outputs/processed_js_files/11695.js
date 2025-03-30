 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Alice',
          email: 'alice@example.com',
          address: {
            city: 'Wonderland',
            zipcode: '12345'
          }
        },
        posts: [
          { id: 1, title: 'Advanced JavaScript', content: 'Understanding modern JS...' },
          { id: 2, title: 'Async Programming', content: 'Learning async patterns...' }
        ]
      });
    }, 1000);
  });
};

 
(async () => {
  try {
    const { user: { name, email, address: { city } }, posts } = await fetchData();
    
    print(`User: ${name}`);
    print(`Email: ${email}`);
    print(`City: ${city}`);
    
    print('Posts:');
    posts.forEach(({ id, title }) => {
      print(`  #${id}: ${title}`);
    });

     
    const newPost = { id: 3, title: 'Spread Operator in JS', content: 'Using ... to spread objects.' };
    const updatedPosts = [...posts, newPost];

    print('\nUpdated Posts:');
    updatedPosts.forEach(({ id, title }) => {
      print(`  #${id}: ${title}`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
