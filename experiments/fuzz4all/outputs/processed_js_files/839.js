(async function complexExample() {
   

   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: 'Alice' },
        posts: [
          { id: 101, title: 'Post One' },
          { id: 102, title: 'Post Two' }
        ]
      });
    }, 1000);
  });

   
  const getUserData = async () => {
    const data = await fetchData();
    return data;
  };

   
  const main = async () => {
    try {
      const { user, posts } = await getUserData();

      print(`User Info:\nID: ${user.id}\nName: ${user.name}`);
      print(`Posts:`);

       
      posts.map(({ id, title }) => print(`- ${title} (ID: ${id})`));

       
      const logUserDetails = ({ name, ...details }) => print(`Details for ${name}:`, details);
      logUserDetails(user);

    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  await main();
})();
