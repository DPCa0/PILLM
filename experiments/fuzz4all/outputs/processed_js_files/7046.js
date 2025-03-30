 
import fs from 'fs/promises';

 
async function readJsonFile(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file: ${error}`);
  }
}

 
const loggingHandler = {
  get(target, prop, receiver) {
    print(`Accessing property ${prop}`);
    return Reflect.get(...arguments);
  },
  set(target, prop, value, receiver) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(...arguments);
  }
};

 
const config = {
  apiEndpoint: "https://api.example.com",
  apiKey: "12345"
};

const proxiedConfig = new Proxy(config, loggingHandler);

 
function* generateSequence(start = 0, end = 10) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
async function run() {
  print("Reading configuration...");
  await readJsonFile('./config.json');

  print("Modifying configuration through Proxy...");
  proxiedConfig.apiKey = "67890";

  print("Generating sequence...");
  const sequenceGenerator = generateSequence(1, 5);
  for (const value of sequenceGenerator) {
    print(value);
  }
}

run();
