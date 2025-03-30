 

 
function* fetchDataGen() {
  const data = yield new Promise((resolve) => setTimeout(() => resolve("Data fetched!"), 1000));
  return data;
}

 
async function runGenerator(genFunc) {
  const iterator = genFunc();
  async function handle(yielded) {
    if (!yielded.done) {
      const result = await yielded.value;
      return handle(iterator.next(result));
    }
    return yielded.value;
  }
  return handle(iterator.next());
}

 
const handler = {
  apply: (target, thisArg, argumentsList) => {
    print(`Called function ${target.name} with arguments: ${argumentsList}`);
    return target(...argumentsList);
  }
};

 
function processData(data) {
  return `Processing: ${data}`;
}

 
const proxyProcessData = new Proxy(processData, handler);

 
(async function main() {
  print("Starting main...");

   
  const data = await runGenerator(fetchDataGen);
  print(data);

   
  const processedData = proxyProcessData(data);
  print(processedData);

  print("Finished main!");
})();
