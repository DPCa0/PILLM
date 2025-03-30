(async () => {
   
  function fetchUserData(id) {
     
    return new Promise((resolve) => {
      setTimeout(() => resolve({ id, name: `User${id}`, score: Math.random() * 100 }), 1000);
    });
  }

  async function* userDataGenerator(userIds) {
    for (const id of userIds) {
      yield await fetchUserData(id);
    }
  }

   
  const handler = {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Accessing property '${prop}' with value: ${obj[prop]}`);
        return obj[prop];
      } else {
        throw new Error(`Property '${prop}' does not exist.`);
      }
    },
  };

  const userIds = [1, 2, 3, 4, 5];
  const userGenerator = userDataGenerator(userIds);

  for await (const userData of userGenerator) {
    const proxiedUser = new Proxy(userData, handler);
    print(`User ID: ${proxiedUser.id}, User Name: ${proxiedUser.name}, User Score: ${proxiedUser.score.toFixed(2)}`);
  }

   
  const usersSet = new Set([...userIds.map(id => `User${id}`)]);
  const scoresMap = new Map([...userIds.map(id => [`User${id}`, Math.random() * 100])]);

  print('\nUsers in Set:', [...usersSet].join(', '));
  print('Scores Map:', [...scoresMap.entries()].map(([user, score]) => `${user}: ${score.toFixed(2)}`).join(', '));

   
  const { 0: firstUser, ...restUsers } = userIds.map(id => ({ id, name: `User${id}` }));
  print('\nFirst User:', firstUser);
  print('Rest of Users:', restUsers);

   
  function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => `${result}${string}<strong>${values[i] || ''}</strong>`, '');
  }

  const message = highlight`Welcome ${firstUser.name