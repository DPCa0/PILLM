 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : `Property ${prop} does not exist`;
  }
};

const target = { message: "Welcome to advanced JavaScript!" };
const proxy = new Proxy(target, handler);

 
function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

 
(async () => {
  print(proxy.message);  
  print(proxy.nonExistentProp);  

  const sequence = infiniteSequence();

  for (let i = 0; i < 3; i++) {
    print(`Generated number: ${sequence.next().value}`);
    await delay(1000);  
  }

   
  const [a, b, ...rest] = [10, 20, 30, 40, 50];
  print(`Destructured values: a=${a}, b=${b}, rest=${rest}`);

   
  await delay(500).then(() => print('Chained Promise resolved after 500ms'));
})();
