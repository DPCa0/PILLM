(async function advancedJS() {
   
  const getUserInfo = (user) => ({
    name: user?.name ?? "Anonymous",
    email: user?.email ?? "No Email",
  });

   
  const users = [
    { name: "Alice", email: "alice@example.com" },
    { name: "Bob" },  
    null,  
    { email: "eve@example.com" },  
  ];

   
  const emailsSet = new Set();
  const usersMap = new Map(
    users.map((user, index) => {
      const { name, email } = getUserInfo(user);
      if (email) emailsSet.add(email);
      return [index, { name, email }];
    })
  );

   
  const fetchData = async (url) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) resolve(`Data from ${url}`);
        else reject(`Error fetching ${url}`);
      }, 1000);
    });

  const urls = ["https://api.example1.com", "https://api.example2.com"];
  const results = await Promise.allSettled(urls.map(fetchData));

   
  results.forEach(({ status, value, reason }, i) => {
    print(`Fetch ${i + 1}: ${status === "fulfilled" ? value : reason}`);
  });

   
  function* idGenerator() {
    let id = 1;
    while (true) yield id++;
  }

  const ids = idGenerator();
  print(`User IDs: ${[...usersMap.keys()].map(() => ids.next().value).join(', ')}`);

   
  const handler = {
    get: (obj, prop) => {
      print(`Accessing property "${prop}"`);
      return obj[prop];
    },
  };

  const proxiedUser = new Proxy(getUserInfo(users[0]), handler);
  print(`Proxied user name: ${proxiedUser.name}`);
})();
