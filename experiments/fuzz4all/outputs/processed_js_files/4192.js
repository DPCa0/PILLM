 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ data: "Hello, world!" });
      } else {
        reject("404 Not Found");
      }
    }, 1000);
  });
};

 
async function getData(url) {
  try {
    let response = await fetchData(url);
    print(`Data fetched: ${response.data}`);
    return response.data;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
function* orchestrator() {
  print("Starting sequence...");
  const data = yield getData("https://api.example.com/data");
  print("Sequence complete.");
  return data;
}

 
async function runGenerator(genFunc) {
  const iterator = genFunc();
  let result = iterator.next();
  while (!result.done) {
    const value = await result.value;
    result = iterator.next(value);
  }
  return result.value;
}

 
runGenerator(orchestrator).then(data => {
  print(`Final Result: ${data}`);
});
