 

 
const fetchData = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve({
      user: { name: "Alice", age: 30 },
      posts: [
        { title: "Learning JavaScript", content: "JavaScript is awesome!" },
        { title: "Advanced Features", content: "Let's explore async/await and closures." }
      ]
    });
  }, 1000);
});

 
async function displayData() {
  try {
    const { user, posts } = await fetchData();   

     
    const createGreeting = (name) => {
      return () => print(`Hello, ${name}!`);
    };
    
    const greetUser = createGreeting(user.name);
    greetUser();   

     
    posts.forEach(({ title, content }) => {
      print(`Title: ${title}`);
      print(`Content: ${content}`);
      print('---');
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
displayData();
