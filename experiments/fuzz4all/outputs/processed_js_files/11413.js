 

 
const arrayHandler = {
  set(target, property, value) {
    print(`Array element at index ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedArray = new Proxy([], arrayHandler);

 
function* numberGenerator() {
  for (let i = 1; i <= 5; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
}

 
async function processNumbers() {
  const gen = numberGenerator();

  for await (const number of gen) {
    print(`Generated number: ${number}`);
    proxiedArray.push(number);
  }

  print('Final Array:', proxiedArray);
}

 
processNumbers();
