 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Alice', 'Bob', 'Charlie']);
    }, 1000);
  });
}

 
(async () => {
   
  const [user1, user2, user3] = await fetchData();

   
  print(`Fetched users: ${user1}, ${user2}, ${user3}`);

   
  const userMap = new Map();
  [user1, user2, user3].forEach((user, index) => userMap.set(index, user));

   
  const userKeys = [...userMap.keys()];
  print('User keys:', userKeys);

   
  const fourthUser = userMap.get(3)?.name ?? 'No user found';
  print(fourthUser);

   
  function* userGenerator(users) {
    for (const user of users) {
      yield user.toUpperCase();
    }
  }

  const generator = userGenerator([user1, user2, user3]);
  for (const uppercasedUser of generator) {
    print('Uppercased user:', uppercasedUser);
  }

   
  const handler = {
    get(target, prop) {
      print(`Accessed property: ${prop}`);
      return target[prop];
    },
  };

  const proxiedUser = new Proxy({ id: 1, name: 'Alice' }, handler);
  print('User name from proxy:', proxiedUser.name);
})();
