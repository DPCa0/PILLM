 
const data = [
  { name: 'Alice', age: 25, role: 'developer' },
  { name: 'Bob', age: 30, role: 'manager' },
  { name: 'Charlie', age: 28, role: 'designer' }
];

 
const handler = {
  get(target, property) {
    print(`Accessing ${property}: ${target[property]}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyData = new Proxy(data, handler);

 
const getDevelopers = (people) => {
  const developers = people.filter(({ role, ...rest }) => {
    if (role === 'developer') {
      return { role, ...rest };
    }
  });
  return developers;
};

 
async function fetchUserData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const userData = await response.json();
    print(userData);
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  print('Fetching remote user data...');
  await fetchUserData('https://jsonplaceholder.typicode.com/users');
})();

 
const uniqueNames = new Set(data.map(({ name }) => name));
print('Unique names:', uniqueNames);

 
const developers = getDevelopers(proxyData);
print('Developers:', developers);
