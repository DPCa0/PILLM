 

 
async function fetchData() {
  const fetchPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { userId: 1, name: "John Doe" };
      resolve(data);
    }, 1000);
  });
  return await fetchPromise;
}

 
const handler = {
  get: function (target, prop, receiver) {
    if (prop in target) {
      print(`Getting property ${prop}: ${target[prop]}`);
      return Reflect.get(...arguments);
    } else {
      throw new ReferenceError(`Property ${prop} does not exist.`);
    }
  },
  set: function (target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const user = new Proxy({}, handler);

 
function* userDataGenerator(userData) {
  for (const key of Object.keys(userData)) {
    yield { key, value: userData[key] };
  }
}

 
(async function main() {
  try {
    const userData = await fetchData();
    print("Data fetched:", userData);

     
    user.userId = userData.userId;
    user.name = userData.name;
    print(user.name);

     
    print("Iterating over user data:");
    const userGen = userDataGenerator(user);
    for (const { key, value } of userGen) {
      print(`${key}: ${value}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
