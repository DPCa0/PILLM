 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) resolve({ data: { user: { name: "Alice", age: 30, job: "Developer" } } });
      else reject(new Error("URL not provided"));
    }, 1000);
  });
};

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return property in target ? target[property] : `Property ${property} does not exist`;
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const processUserData = async (url) => {
  try {
    const { data: { user } } = await fetchData(url);  
    const proxyUser = new Proxy(user, handler);

    print(`User's Name: ${proxyUser.name}`);
    print(`User's Age: ${proxyUser.age}`);
    print(`User's Job: ${proxyUser.job}`);

    // Modify properties using the proxy
    proxyUser.job = "Senior Developer";

    print(`Updated User's Job: ${proxyUser.job}`);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

 
processUserData("https://api.example.com/user");
