 
const getData = async () => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      success ? resolve({ data: [1, 2, 3, 4, 5] }) : reject('Error fetching data');
    }, 1000);
  });
};

 
function* dataProcessor() {
  try {
    const data = yield getData();
    const doubled = data.data.map(x => x * 2);
    print('Processed Data:', doubled);
  } catch (error) {
    console.error('Data processing failed:', error);
  }
}

 
function runGenerator(genFunc) {
  const genObj = genFunc();

  function handleResult(next) {
    if (next.done) return;
    next.value.then(
      result => handleResult(genObj.next(result)),
      err => genObj.throw(err)
    );
  }

  handleResult(genObj.next());
}

runGenerator(dataProcessor);

 
const obj = { a: 1, b: 2, c: { d: 3, e: 4 } };
const { a, b, c: { d, e } } = obj;
print(`Destructured values: a=${a}, b=${b}, d=${d}, e=${e}`);

 
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];
print('Unique Numbers:', uniqueNumbers);

 
const targetObject = { name: 'John', age: 30 };
const handler = {
  set(target, property, value) {
    print(`Property ${property} set to ${value}`);
    target[property] = value;
    return true;
  }
};

const proxyObj = new Proxy(targetObject, handler);
proxyObj.name = 'Jane';
proxyObj.age = 31;
