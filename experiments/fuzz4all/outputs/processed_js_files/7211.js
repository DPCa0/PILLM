 
class DataFetchError extends Error {
  constructor(message) {
    super(message);
    this.name = "DataFetchError";
  }
}

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new DataFetchError(`Failed to fetch data from ${url}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof DataFetchError) {
      console.error(error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
};

 
const person = {
  name: "Alice",
  age: 30,
};

const personProxy = new Proxy(person, {
  get(target, property) {
    if (property === "age") {
      return `${target[property]} years old`;
    }
    return target[property];
  },
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[property] = value;
    return true;
  },
});

 
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

 
const uniqueId = Symbol("id");
const user = {
  [uniqueId]: 1,
  name: "Bob",
};

 
(async () => {
  const data = await fetchData("https://api.example.com/data");
  print("Fetched data:", data);

  print(personProxy.name);  
  print(personProxy.age);  

  personProxy.age = 31;  
  print(personProxy.age);  

  try {
    personProxy.age = "thirty";  
  } catch (error) {
    console.error(error.message);
  }

  const idGen = idGenerator();
  print(idGen.next().value);  
  print(idGen.next().value);  

  print("User's unique ID:", user[uniqueId]);
})();
