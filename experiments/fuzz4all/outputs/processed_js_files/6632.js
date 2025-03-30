 
async function* fibonacci() {
  let [prev, curr] = [0, 1];
  while (true) {
     
    yield await new Promise(resolve => setTimeout(() => resolve(curr), 1000));
    [prev, curr] = [curr, prev + curr];
  }
}

 
function monitorFibonacci(generator) {
  return new Proxy(generator, {
    get(target, prop, receiver) {
      print(`Accessing property: ${prop}`);
      return Reflect.get(target, prop, receiver);
    }
  });
}

 
(async () => {
  const fibGenerator = monitorFibonacci(fibonacci());
  const fibNumbers = [];

  for await (let num of fibGenerator) {
    print(num);
    fibNumbers.push(num);
     
    if (fibNumbers.length === 10) break;
  }

   
  const [first, second, ...rest] = fibNumbers;
  const augmentedSequence = [...rest, first + second];
  print('Augmented Sequence:', augmentedSequence);

   
  function style(strings, ...values) {
    return strings.reduce((result, string, i) => result + string + (values[i] ? `%c${values[i]}` : ''), '');
  }

  print(style`First number: ${first}`, 'color: red; font-weight: bold;');
  print(style`Second number: ${second}`, 'color: blue; font-weight: bold;');
})();
