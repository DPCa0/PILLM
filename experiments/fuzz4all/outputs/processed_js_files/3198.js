 
const fetchJsonPlaceholderData = async (userId) => {
  try {
     
    const userResponse = await fetch(`https: 
    const user = await userResponse.json();

     
    const postsResponse = await fetch(`https: 
    const posts = await postsResponse.json();

     
    const { name, email } = user;

     
    print(`User: ${name} (${email})`);
    print('Posts:');

     
    posts.map(({ title, body }, index) => ({
      id: index + 1,
      title,
      body,
    })).forEach(({ id, title, body }) => {
      print(`\nPost ${id}:\nTitle: ${title}\nBody: ${body}\n`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
fetchJsonPlaceholderData(1);
