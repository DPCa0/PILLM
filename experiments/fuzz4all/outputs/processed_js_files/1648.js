 
async function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

 
function* fibonacci(n) {
  let a = 0, b = 1, temp;
  while (n > 0) {
    yield a;
    temp = a;
    a = b;
    b = temp + b;
    n--;
  }
}

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Getting ${prop}`);
    return Reflect.get(...arguments);
  },
  set: function(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

const obj = new Proxy({ x: 10, y: 20 }, handler);

 
(async function() {
  try {
    const response = await fetchData("https://api.example.com/data");
    print("Fetched Data:", response.data);

    print("Fibonacci Series:");
    for (const num of fibonacci(10)) {
      print(num);
    }

    obj.x = 100;
    print("obj.x:", obj.x);
  } catch (error) {
    console.error("Error:", error);
  }
})();
