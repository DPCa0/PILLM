 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: "John Doe", age: 30 },
        posts: [
          { id: 1, title: "Post 1", content: "Content 1" },
          { id: 2, title: "Post 2", content: "Content 2" },
        ],
      });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const { user, posts } = await fetchData();
    
    const userInfo = ({ name, age }) => `User: ${name}, Age: ${age}`;
    const userPosts = (posts) => posts.map(({ title, content }) => ({ title, content }));

    print(userInfo(user));
    print("Posts:", userPosts(posts));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
processUserData();
