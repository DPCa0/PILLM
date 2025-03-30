 
async function* fetchUsersInChunks(url, chunkSize) {
  let response = await fetch(url);
  let users = await response.json();

  for (let i = 0; i < users.length; i += chunkSize) {
    yield users.slice(i, i + chunkSize);
  }
}

 
const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : `Property ${prop} does not exist`;
  },
  set: function(target, prop, value) {
    if (prop === "age" && value < 0) {
      throw new Error("Age cannot be negative");
    }
    target[prop] = value;
    return true;
  }
};

 
function mapUserData(users) {
  return users.map(user => new Proxy(user, handler));
}

 
async function processUsers() {
  const userChunks = fetchUsersInChunks("https://jsonplaceholder.typicode.com/users", 3);

  for await (let chunk of userChunks) {
    const proxiedUsers = mapUserData(chunk);
    proxiedUsers.forEach(user => {
      print(`Name: ${user.name}`);
      print(`Company: ${user.company}`);
      user.age = 30;  
      try {
        user.age = -5;  
      } catch (e) {
        console.error(e.message);
      }
    });
  }
}

 
processUsers().catch(console.error);
