 

 
async function fetchData(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Data from ${url}` });
    }, 1000);
  });
}

 
async function loadUserProfile() {
  const url = 'https://api.example.com/user';
  const { data: userProfile } = await fetchData(url);
  print(userProfile);
}

 
const handler = {
  get(target, property) {
    print(`Accessing property '${property}'`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property '${property}' to '${value}'`);
    target[property] = value;
    return true;
  },
};

const user = { name: 'Alice', age: 30 };
const proxiedUser = new Proxy(user, handler);

 
(async () => {
  await loadUserProfile();
  print(`Name before setting: ${proxiedUser.name}`);
  proxiedUser.name = 'Bob';
  print(`Name after setting: ${proxiedUser.name}`);
})();
