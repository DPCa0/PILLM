 
async function fetchAndProcessUserData() {
  try {
     
    const getData = () =>
      new Promise((resolve) =>
        setTimeout(
          () => resolve([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]),
          1000
        )
      );
    
    const users = await getData();

     
    const userNames = users.map(user => user.name);
    const userInfo = userNames.reduce((info, name) => `${info}, ${name}`, "Users:").slice(2);

    print(userInfo);

     
    const userHandler = {
      get: (target, prop) => {
        if (prop in target) {
          return target[prop];
        } else {
          print(`Property ${prop} doesn't exist`);
          return 'Unknown';
        }
      },
    };

    const proxiedUser = new Proxy(users[0], userHandler);

    // Accessing an existing and a non-existing property
    print(`ID: ${proxiedUser.id}`); // Existing
    print(`Email: ${proxiedUser.email}`); // Non-existing

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
function* charGenerator(str) {
  for (let char of str) {
    yield char;
  }
}

const message = "Hello, Proxy!";
const generator = charGenerator(message);
for (let char of generator) {
  print(char);
}

 
fetchAndProcessUserData();
