 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'validUrl') {
        resolve({ data: 'Sample Data' });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
}

 
function* dataGenerator() {
  try {
    const data = yield fetchData('validUrl');
    return data;
  } catch (error) {
    return error.message;
  }
}

 
async function handleDataFetching(generator) {
  const iterator = generator();
  const { value: fetchPromise } = iterator.next();

  try {
    const data = await fetchPromise;
    const { value: result } = iterator.next(data);
    print('Result:', result);
  } catch (error) {
    const { value: errorMsg } = iterator.throw(error);
    print('Error:', errorMsg);
  }
}

 
const target = { data: 'Initial Data' };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed, value: ${obj[prop]}`);
    return obj[prop];
  },
  set: (obj, prop, value) => {
    print(`Property '${prop}' set to: ${value}`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
proxy.data = 'Updated Data';
print(proxy.data);

 
handleDataFetching(dataGenerator);
