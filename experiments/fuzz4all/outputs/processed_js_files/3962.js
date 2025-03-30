 
async function complexFeatureDemo() {
   
  const { default: axios } = await import('https://cdn.skypack.dev/axios');

   
  function* fibonacci(n) {
    let a = 0, b = 1;
    for (let i = 0; i < n; i++) {
      yield a;
      [a, b] = [b, a + b];
    }
  }

   
  const [catData, dogData] = await Promise.all([
    axios.get('https://catfact.ninja/fact').then(response => response.data),
    axios.get('https://dog.ceo/api/breeds/image/random').then(response => response.data)
  ]);

  print('Cat Fact:', catData.fact);
  print('Dog Image URL:', dogData.message);

   
  const handler = {
    get(target, property) {
      print(`Property '${property}' accessed.`);
      return target[property];
    },
    set(target, property, value) {
      print(`Property '${property}' set to ${value}.`);
      target[property] = value;
      return true;
    }
  };

  const obj = new Proxy({}, handler);
  obj.test = 'Testing proxy';
  print(obj.test);

   
  const fibSequence = fibonacci(10);
  print('Fibonacci Sequence:', [...fibSequence]);
}

 
complexFeatureDemo().catch(console.error);
