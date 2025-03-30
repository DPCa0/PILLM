 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
}

 
const userHandler = {
  set(target, property, value) {
    print(`Setting value '${value}' to '${property}'`);
    target[property] = value;
    return true;
  }
};

 
function getUserData() {
  return fetchData('https://jsonplaceholder.typicode.com/users/1')
    .then(data => {
      const userProxy = new Proxy(data, userHandler);
      return userProxy;
    });
}

 
(async () => {
  try {
    const user = await getUserData();
    const { name, email } = user;
    print(`User Name: ${name}`);
    print(`User Email: ${email}`);
    user.name = "John Doe";   
  } catch (error) {
    console.error('Error:', error);
  }
})();
