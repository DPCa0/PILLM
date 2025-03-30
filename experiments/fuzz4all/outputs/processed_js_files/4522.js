 

 
function* numberGenerator(arr) {
  for (let num of arr) {
    yield num;
  }
}

 
async function fetchData(num) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(`Fetched data for number: ${num}`), 1000)
  );
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (prop === 'next') {
      print('Generator next() called');
    }
    return Reflect.get(target, prop, receiver);
  },
};

 
const numbers = [1, 2, 3, 4, 5];

 
const proxiedGenerator = new Proxy(numberGenerator(numbers), handler);

 
async function processNumbers() {
  for (let result = proxiedGenerator.next(); !result.done; result = proxiedGenerator.next()) {
    const data = await fetchData(result.value);
    print(data);
  }
}

processNumbers();
