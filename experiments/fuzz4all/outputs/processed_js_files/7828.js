 

 
async function fetchData() {
   
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: "John Doe",
          email: "john.doe@example.com",
          preferences: {
            theme: "dark",
            language: "en-US",
          },
        },
        posts: [
          { id: 1, title: "Async JavaScript" },
          { id: 2, title: "Understanding Promises" },
        ],
      });
    }, 1000);
  });

  return response;
}

 
async function displayData() {
  try {
    const { user, posts } = await fetchData();  

     
    print(`User Info: ${user.name}, ${user.email}`);
    
     
    const userWithExtraInfo = { ...user, accountType: "Premium" };
    print("Extended User Info:", userWithExtraInfo);

     
    print("User Posts:");
    posts.forEach(({ id, title }) => {
      print(`Post ${id}: ${title}`);
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
displayData();
