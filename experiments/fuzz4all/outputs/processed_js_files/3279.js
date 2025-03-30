 

const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

 
const metaDataKey = Symbol('metaData');

 
const processUserData = async (url) => {
  const { results } = await fetchData(url);
  const usersSet = new Set(results.map(user => JSON.stringify(user)));
  
  return [...usersSet].map(data => {
    const user = JSON.parse(data);
    const { name: { first, last }, email } = user;
    return {
      fullName: `${first} ${last}`,
      email
    };
  });
};

 
const userCache = new Map();

const getUserData = async (url) => {
  if (userCache.has(url)) {
    print('Returning cached data');
    return userCache.get(url);
  }
  print('Fetching new data');
  const userData = await processUserData(url);
  userCache.set(url, userData);
  return userData;
};

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property: ${property}`);
    return Reflect.get(...arguments);
  }
};

(async () => {
  const apiUrl = 'https://randomuser.me/api/?results=5';

   
  let users = await getUserData(apiUrl);
  users = new Proxy(users, handler);

   
  users[metaDataKey] = { source: apiUrl, count: users.length };

  print(users);
  print(users[metaDataKey]);
})();
