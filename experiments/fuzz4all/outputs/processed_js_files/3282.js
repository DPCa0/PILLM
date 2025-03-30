 

const fetchData = async () => {
   
  const fetchUser = () => new Promise(resolve => setTimeout(() => resolve({ name: 'Alice', age: 28 }), 1000));
  const fetchPosts = () => new Promise(resolve => setTimeout(() => resolve([{ id: 1, title: 'Post One' }, { id: 2, title: 'Post Two' }]), 1500));
  
   
  const [user, posts] = await Promise.all([fetchUser(), fetchPosts()]);

   
  const { name, age } = user;
  const allPosts = [...posts];

   
  const output = `
    User Profile:
    Name: ${name}
    Age: ${age}
    
    Posts:
    ${allPosts.map(post => `ID: ${post.id}, Title: "${post.title}"`).join('\n')}
  `;

   
  print(output);
};

 
fetchData().catch(console.error);
