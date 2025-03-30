 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);  
  return {
    user: { id: 1, name: "Alice", email: "alice@example.com" },
    posts: [
      { id: 1, title: "Post 1", content: "Content 1" },
      { id: 2, title: "Post 2", content: "Content 2" }
    ]
  };
}

 
async function displayData() {
  const data = await fetchData();
  const { user: { name, email }, posts } = data;
  print(`User: ${name} (${email})`);
  posts.forEach(({ title, content }) => {
    print(`Post: ${title}\nContent: ${content}`);
  });
}

 
const userDataHandler = {
  get(target, property) {
    print(`Accessing ${property} of user`);
    return target[property];
  }
};

(async () => {
  const data = await fetchData();
  const proxyUser = new Proxy(data.user, userDataHandler);
  print(`Proxy User Name: ${proxyUser.name}`);
})();

 
displayData();
