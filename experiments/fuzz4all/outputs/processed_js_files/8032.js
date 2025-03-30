 

const data = {
  user: { name: 'Alice', age: 30 },
  status: 'active'
};

 
const handler = {
  get(target, property) {
    print(`Getting ${property}`);
    return Reflect.get(target, property);
  },
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value);
  }
};

const proxiedData = new Proxy(data, handler);

 
async function fetchUserData() {
  print('Fetching user data...');
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: 1, name: 'Alice', age: 31 }), 1000);
  });
}

 
async function updateUserInfo() {
  const userData = await fetchUserData();
  for (const key of Object.keys(userData)) {
    proxiedData.user[key] = userData[key];
  }
  print('User data updated:', proxiedData.user);
}

 
(async function main() {
  print('Initial User:', proxiedData.user);
  await updateUserInfo();
})();
