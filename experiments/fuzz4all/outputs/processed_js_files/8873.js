 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({
          user: { name: "John Doe", age: 30 },
          posts: [{ title: "Post 1" }, { title: "Post 2" }]
        });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function displayUserData() {
  try {
    const url = "https://api.example.com/data";
    const { user, posts } = await fetchData(url);

     
    const { name, age } = user;
    print(`User: ${name}, Age: ${age}`);

     
    const [{ title: firstPost }, ...otherPosts] = posts;
    print(`First Post: ${firstPost}`);
    
    otherPosts.forEach(({ title }, index) => {
      print(`Other Post ${index + 1}: ${title}`);
    });

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

displayUserData();
