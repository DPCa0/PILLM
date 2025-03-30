 

 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Sample Data", status: 200 });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
};

 
const getData = async () => {
  try {
    const response = await fetchData("https://api.example.com/data");
    print("Data Fetched:", response.data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

 
const handler = {
  get(target, property) {
    print(`Getting property ${property}`);
    return property in target ? target[property] : undefined;
  },
  set(target, property, value) {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  },
};

const obj = new Proxy({}, handler);
obj.name = "Advanced JavaScript";
print(obj.name);

 
getData();
