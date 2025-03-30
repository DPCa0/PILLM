 
const target = {
  message1: "Hello",
  message2: "World",
};

const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : "Property not found"),
};

const proxy = new Proxy(target, handler);

 
const { message1, message3 } = proxy;
print(`${message1}, ${message3}!`);  

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 1000);
  });
};

(async () => {
  try {
    const [data1, data2] = await Promise.all([
      fetchData("https://api.example.com/data1"),
      fetchData("https://api.example.com/data2"),
    ]);

    print(data1);  
    print(data2);  
  } catch (error) {
    console.error("Error fetching data", error);
  }
})();

 
function* numberGenerator() {
  let number = 0;
  while (true) {
    yield number++;
  }
}

const generator = numberGenerator();
for (let i of generator) {
  print(i);  
  if (i >= 5) break;  
}
