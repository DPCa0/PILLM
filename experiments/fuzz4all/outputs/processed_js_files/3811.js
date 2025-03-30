 

 
async function fetchData() {
  const simulateAPICall = () => new Promise((resolve) =>
    setTimeout(() => resolve({ data: "Complex Data" }), 2000)
  );

  try {
    print("Fetching data...");
    const result = await simulateAPICall();
    print("Data received:", result.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
function processArray(arr) {
  const transformedArray = arr
    .filter((num) => num % 2 === 0)
    .map((num) => num * 2);
  
  print(`Processed Array: ${transformedArray.join(", ")}`);
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return prop in target ? target[prop] : 42;
  },
  set: (target, prop, value) => {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({}, handler);
obj.a = 10;
print(obj.a);
print(obj.b);

 
async function fetchGithubUser(username) {
  const response = await fetch(`https: 
  if (!response.ok) throw new Error("Network response was not ok");
  const user = await response.json();
  print(`GitHub User: ${user.name}`);
}

 
fetchData();
processArray([1, 2, 3, 4, 5, 6]);
fetchGithubUser('octocat').catch(console.error);
