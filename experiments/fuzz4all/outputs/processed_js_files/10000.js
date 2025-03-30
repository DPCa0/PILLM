 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: "Alice", age: 30 }, posts: [1, 2, 3] });
    }, 1000);
  });
};

 
const getUserData = async () => {
  try {
     
    const { user, posts } = await fetchData();

     
    const { name, age } = user;

     
    print(`User's name is ${name} and age is ${age}.`);
    print(`User has ${posts.length} posts.`);

     
    const postDetailsPromises = posts.map((post) =>
      fetch(`https: 
        res.json()
      )
    );

    const postDetails = await Promise.all(postDetailsPromises);
    postDetails.forEach(({ id, title }) =>
      console.log(`Post ${id}: ${title}`)
    );
  } catch (error) {
    console.error("An error occurred while fetching user data:", error);
  }
};

 
getUserData();
