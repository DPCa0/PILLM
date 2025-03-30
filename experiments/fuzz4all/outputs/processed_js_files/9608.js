 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: { user: "John Doe", age: 30 } });
      } else {
        reject(new Error("Invalid URL"));
      }
    }, 1000);
  });
}

 
async function processUserData(url) {
  try {
    const response = await fetchData(url);
    const { user, age } = response.data;

     
    print(`Fetched User: ${user}, Age: ${age}`);

     
    const handler = {
      get: (target, property) => {
        return property in target ? target[property] : "Not Available";
      },
    };

    const proxyUser = new Proxy(response.data, handler);

     
    print(`Access via Proxy - User: ${proxyUser.user}, Age: ${proxyUser.age}`);
    print(`Non-existent Property via Proxy: ${proxyUser.email}`);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(num => num ** 2);
const evenSquares = squares.filter(num => num % 2 === 0);

print(`Numbers: ${numbers}`);
print(`Squares: ${squares}`);
print(`Even Squares: ${evenSquares}`);

 
processUserData("https://api.example.com/data");
