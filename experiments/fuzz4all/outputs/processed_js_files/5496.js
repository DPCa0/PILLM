 

 
const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
function* fetchGenerator() {
  const urls = ['https://api.example.com/1', 'https://api.example.com/2'];
  for (const url of urls) {
    yield fetchData(url);
  }
}

 
const runGenerator = async (gen) => {
  const generator = gen();
  let result = generator.next();
  while (!result.done) {
     
    const data = await result.value;
    print(data);
    result = generator.next();
  }
};

 
const targetObject = {
  prop1: 'value1',
  prop2: 'value2',
};

const proxy = new Proxy(targetObject, {
  get(target, prop) {
    if (prop in target) {
      print(`Accessing ${prop}: ${target[prop]}`);
      return target[prop];
    }
    return 'Property does not exist';
  },
});

 
(async () => {
  print('--- Running Generator ---');
  await runGenerator(fetchGenerator);

  print('--- Accessing Proxy ---');
  const { prop1, prop2, prop3 } = proxy;
  print(`Destructured prop1: ${prop1}`);
  print(`Destructured prop2: ${prop2}`);
  print(`Destructured prop3: ${prop3}`);
})();
