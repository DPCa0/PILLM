 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch data: ${error}`);
  }
};

const processData = ({ id, name, username }) => `User ID: ${id}, Name: ${name}, Username: ${username}`;

const dataMap = new Map();

const handler = {
  set: (obj, prop, value) => {
    if (prop === 'users' && Array.isArray(value)) {
      value.forEach(user => {
        if (!dataMap.has(user.id)) {
          dataMap.set(user.id, processData(user));
        }
      });
    }
    return Reflect.set(...arguments);
  }
};

const state = new Proxy({ users: [] }, handler);

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const data = await fetchData(url);

  if (data) {
    state.users = data;

     
    for (const [, userInfo] of dataMap.entries()) {
      print(userInfo);
    }
  }
})();
