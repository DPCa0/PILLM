 

 
const handler = {
  get: (target, property, receiver) => {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
let user = {
  name: "Alice",
  age: 25
};

 
let proxiedUser = new Proxy(user, handler);

 
print(proxiedUser.name);
proxiedUser.age = 30;

 
async function fetchData(url) {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    let data = await response.json();
    print(data);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');
