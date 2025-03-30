 
function* generateRandomValues() {
  yield Math.random();
  yield Math.random() * 10;
  yield Math.random() * 100;
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
  for (let value of generateRandomValues()) {
    await delay(1000);
    print(`Fetched Value: ${value.toFixed(2)}`);
  }
}

const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessed property: ${property}`);
      return target[property];
    }
    return `Property ${property} doesn't exist.`;
  }
};

const dataProxy = new Proxy({name: 'Advanced JS', type: 'Demo'}, handler);

const main = async () => {
  print(`Application: ${dataProxy.name}`);
  await fetchData();
  const {name, version = '1.0'} = dataProxy;
  print(`Project: ${name}, Version: ${version}`);
}

main();
