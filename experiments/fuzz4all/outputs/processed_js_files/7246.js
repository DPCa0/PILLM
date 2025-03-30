 

 
const fetchData = (url) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://api.example.com/data") {
        resolve({ status: 200, data: { name: "John Doe", age: 30 } });
      } else {
        reject({ status: 404, error: "Not Found" });
      }
    }, 1000);
  });

 
function* generatorExample() {
  try {
    const urls = [
      "https://api.example.com/data",
      "https://api.example.com/otherdata",
    ];

    for (const url of urls) {
      yield fetchData(url)
        .then(({ data }) => ({ status: "resolved", value: data }))
        .catch(({ error }) => ({ status: "rejected", value: error }));
    }
  } catch (error) {
    console.error("Error in generator:", error);
  }
}

 
async function asyncGeneratorRunner(generator) {
  const iterator = generator();

  for await (let result of iterator) {
    if (result.status === "resolved") {
      const {
        value: { name, age },
      } = result;
      print(`Fetched Data - Name: ${name}, Age: ${age}`);
    } else {
      console.error(`Fetch Error: ${result.value}`);
    }
  }
}

 
asyncGeneratorRunner(generatorExample);
