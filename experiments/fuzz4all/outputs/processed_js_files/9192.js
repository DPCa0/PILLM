 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const user = new Proxy(
  { name: "Alice", age: 30 },
  {
    get(target, property) {
      print(`Getting property '${property}'`);
      return target[property];
    },
    set(target, property, value) {
      if (property === "age" && typeof value !== "number") {
        throw new TypeError("Age must be a number");
      }
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    }
  }
);

 
const fetchData = async url => {
  try {
    print("Fetching data...");
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error fetching data: ${response.statusText}`);
    const data = await response.json();
    print("Data received:", data);
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

 
const processUserData = async () => {
  const data = await fetchData("https://jsonplaceholder.typicode.com/users");
  if (!data) return;

  const emailSet = new Set(data.map(user => user.email));
  print("Unique emails:", emailSet);

  const userMap = new Map(data.map(user => [user.id, user]));
  print("User map:", userMap);

  await delay(1000);  
  print("Processing completed.");
};

 
user.name = "Bob";
print(user.name);
try {
  user.age = "old";  
} catch (e) {
  console.error(e.message);
}

 
processUserData();
