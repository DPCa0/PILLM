 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { user: { name: "John Doe", age: 30 } } });
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const { data: { user: { name, age } } } = await fetchData();
    print(`User Name: ${name}, Age: ${age}`);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
const user = { name: "Jane Doe", age: 25 };
const userProxy = new Proxy(user, {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
const displayUserData = (userObject) => {
  const userName = userObject?.name ?? "Unknown User";
  const userAge = userObject?.age ?? "Unknown Age";
  print(`Name: ${userName}, Age: ${userAge}`);
};

 
processData();
userProxy.name = "Emily Doe";
print(userProxy.name);
displayUserData(userProxy);
displayUserData(null);
