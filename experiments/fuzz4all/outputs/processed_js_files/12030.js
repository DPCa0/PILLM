 
(async () => {
  if (typeof window !== 'undefined') {
    const { v4: uuidv4 } = await import('https://cdn.jsdelivr.net/npm/uuid@9.0.0/+esm');
    print(`UUID: ${uuidv4()}`);
  }
})();

 
const targetObject = {
  name: 'Alice',
  age: 30
};

const handler = {
  get: (obj, prop) => {
    print(`Getting property '${prop}': ${obj[prop]}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Setting property '${prop}' to ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxyObject = new Proxy(targetObject, handler);

 
proxyObject.name;  
proxyObject.age = 31;  

 
async function* asyncGenerator() {
  yield 'First value';
  await new Promise(res => setTimeout(res, 1000));  
  yield 'Second value after 1 second';
}

(async () => {
  for await (const value of asyncGenerator()) {
    print(value);
  }
})();

 
class CustomKey {
  constructor(id) {
    this.id = id;
  }
}

const map = new Map();
const key1 = new CustomKey(1);
const key2 = new CustomKey(2);

map.set(key1, 'Value associated with key1');
map.set(key2, 'Value associated with key2');

print(map.get(key1));  
print(map.get(key2));  

 
const user = {
  profile: {
    name: 'John Doe',
    preferences: null
  }
};

print(user.profile?.name ?? 'Default Name');  
print(user.profile?.preferences?.theme ?? 'Dark Mode');  
