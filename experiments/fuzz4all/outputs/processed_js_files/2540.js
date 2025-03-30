 

 
const timeoutPromise = (msg, delay) =>
  new Promise((resolve) => setTimeout(() => resolve(msg), delay));

 
async function fetchData() {
  const data = await timeoutPromise("Fetched Data", 2000);
  return data;
}

 
function* dataGenerator() {
  yield fetchData();
  yield timeoutPromise("More Data", 1000);
  yield Promise.resolve("Immediate Data");
}

 
const handler = {
  apply: function (target, thisArg, argumentsList) {
    print(`Called with args: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  },
};

 
const log = new Proxy(console.log, handler);

 
async function main() {
  log("Starting async tasks");
  const tasks = dataGenerator();
  
  for await (const task of tasks) {
    log(await task);
  }
  
  log("All tasks complete");
}

main();
