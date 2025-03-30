 

 
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

 
function* generateSequence() {
  yield* [1, 2, 3];
}

 
const handler = {
  set(target, property, value) {
    if (property === 'age' && !Number.isInteger(value)) {
      throw new TypeError('Age must be an integer');
    }
    target[property] = value;
  },
};

 
const person = new Proxy({}, handler);

 
const iteratorSymbol = Symbol('iterator');

class CustomIterable {
  constructor(data) {
    this.data = data;
  }
  
  [iteratorSymbol]() {
    let index = 0;
    const data = this.data;
    
    return {
      next: () => ({
        value: data[index++],
        done: index > data.length
      })
    };
  }
}

(async () => {
   
  const data = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched Data:', data);
  
   
  for (let value of generateSequence()) {
    print('Generator value:', value);
  }
  
   
  try {
    person.age = 25;
    print('Valid age set:', person.age);
    
    person.age = '25';   
  } catch (error) {
    console.error(error.message);
  }
  
   
  const customIterable = new CustomIterable([10, 20, 30]);
  const iterator = customIterable[iteratorSymbol]();
  
  let result = iterator.next();
  while (!result.done) {
    print('Custom Iterable Value:', result.value);
    result = iterator.next();
  }
})();
