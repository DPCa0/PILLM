 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`GET ${String(prop)}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`SET ${String(prop)} = ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
class FibonacciSequence {
  constructor(max) {
    this.max = max;
  }

  *[Symbol.iterator]() {
    let [prev, curr] = [0, 1];
    while (curr <= this.max) {
      yield curr;
      [prev, curr] = [curr, prev + curr];
    }
  }
}

 
(async () => {
  const userDataUrl = 'https://jsonplaceholder.typicode.com/users';
  const userData = await fetchData(userDataUrl);

  if (userData) {
    const userProxy = createLoggingProxy(userData[0]);
    userProxy.name = 'New Name';  

    print('Iterating over Fibonacci sequence:');
    for (const num of new FibonacciSequence(21)) {
      print(num);
    }
  }
})();
