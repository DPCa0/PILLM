 

 
const fetchData = () => new Promise((resolve) =>
  setTimeout(() => resolve({ user: { name: "Alice", age: 30 }, posts: [1, 2, 3] }), 1000)
);

 
function* generatePosts(posts) {
  for (const post of posts) {
    yield `Post ID: ${post}`;
  }
}

(async function() {
  try {
     
    const { user: { name, age }, posts } = await fetchData();
    print(`User: ${name}, Age: ${age}`);

     
    const postsGenerator = generatePosts(posts);

     
    for (let post of postsGenerator) {
      print(post);
    }
    
     
    const userMap = new Map(Object.entries({ name, age }));
    userMap.forEach((value, key) => print(`${key}: ${value}`));

  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
