 

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const sequenceHandler = {
  get: (target, prop) => {
    if (prop === 'next') {
      return () => target.next().value;
    }
  }
};

 
const sequenceProxy = new Proxy(numberGenerator(), sequenceHandler);

 
async function fetchSequence(count) {
  let results = [];
  for (let i = 0; i < count; i++) {
    results.push(new Promise(resolve => setTimeout(() => resolve(sequenceProxy.next()), 100)));
  }
  return Promise.all(results);
}

 
(async () => {
  print('Fetching sequence...');
  let sequence = await fetchSequence(5);
  print('Sequence:', sequence);
})();

 
const [a, b, c] = ['Advanced', 'JavaScript', 'Features'];
print(`Utilizing ${a} ${b} ${c}!`);
