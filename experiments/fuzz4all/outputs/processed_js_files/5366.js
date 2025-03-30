 
async function fetchData() {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { id: 1, name: "John Doe" },
        posts: [
          { id: 1, title: "Post 1", content: "Lorem ipsum..." },
          { id: 2, title: "Post 2", content: "Dolor sit amet..." },
        ],
      });
    }, 1000);
  });
}

 
(async function () {
  try {
    const { user, posts } = await fetchData();
    const { id, name } = user;
    
     
    print(`User: ${name ?? "Anonymous"} (ID: ${id})`);
    print("Posts:");
    
     
    posts
      .map(({ title, content }) => ({
        title,
        snippet: content.slice(0, 20) + "...",
      }))
      .forEach(({ title, snippet }) => {
        print(`- ${title}: ${snippet}`);
      });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
