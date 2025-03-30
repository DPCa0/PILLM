 

 
const fetchUserData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');
    const users = await response.json();

     
    const userNames = users.map(({ id, name }) => ({ id, name }));

     
    function* userGenerator() {
      for (let user of userNames) {
        yield user;
      }
    }

     
    const userGen = userGenerator();

     
    const userProxy = new Proxy(userGen, {
      get(target, prop, receiver) {
        if (prop === 'next') {
          print('Fetching next user name...');
        }
        return Reflect.get(target, prop, receiver);
      },
    });

     
    for (let user of userProxy) {
      const userData = user.next();
      if (!userData.done) {
        print(`User ID: ${userData.value.id}, Name: ${userData.value.name}`);
      }
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
(async () => {
  await fetchUserData();
})();
