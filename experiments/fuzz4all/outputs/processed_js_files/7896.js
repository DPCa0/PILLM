 

 

const fetchData = url =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject("No URL provided");
      }
    }, 1000);
  });

const processAndLogData = async url => {
  try {
    const data = await fetchData(url);
    const parsedData = { info: data, length: data.length };
    const { info, length } = parsedData;
    print(`Fetched: "${info}" (Length: ${length})`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

 
const symbolKey = Symbol("uniqueKey");
const complexMap = new Map();
complexMap.set(symbolKey, "Symbol Value");
complexMap.set(42, "Answer to the Ultimate Question");

const [key1, key2] = complexMap.keys();
print(`Map values: ${complexMap.get(key1)}, ${complexMap.get(key2)}`);

 
processAndLogData("http://example.com");

