 
const fetchRandomUser = async () => {
  try {
    const response = await fetch('https://randomuser.me/api/');
    const { results: [user] } = await response.json();
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

 
const userValidator = {
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[key] = value;
    return true;
  }
};

 
(async () => {
  const user = await fetchRandomUser();
  if (user) {
     
    const { name: { first, last }, dob: { age } } = user;

     
    const proxyUser = new Proxy({ firstName: first, lastName: last, age: age }, userValidator);

     
    print(`Fetched User: ${proxyUser.firstName} ${proxyUser.lastName}, Age: ${proxyUser.age}`);

     
    try {
      proxyUser.age = 'thirty';
    } catch (error) {
      console.error(error.message);
    }

     
    await new Promise(resolve => setTimeout(resolve, 1000));
    print('Operations completed');
  }
})();
