 
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

 
function* processData(data) {
  for (let value of data) {
    yield value * 2;  
  }
}

 
function higherOrderFunction(fn, data) {
  return data.map(fn);
}

 
(async () => {
  try {
     
    const response = await fetchData("https://api.example.com/data");
    print("Original Data:", response.data);

     
    const processed = processData(response.data);
    print("Processed Data (Generator):", [...processed]);

     
    const multiplyByThree = (x) => x * 3;
    const finalData = higherOrderFunction(multiplyByThree, response.data);
    print("Final Data (Higher-order Function):", finalData);

     
    const dataProxy = new Proxy(finalData, {
      get(target, prop) {
        if (prop < 0 || prop >= target.length) {
          return "Index out of bounds";
        }
        return target[prop];
      }
    });

     
    print("Access via Proxy:", dataProxy[2]);  
    print("Access via Proxy:", dataProxy[10]);  
  } catch (error) {
    console.error("Error:", error);
  }
})();
