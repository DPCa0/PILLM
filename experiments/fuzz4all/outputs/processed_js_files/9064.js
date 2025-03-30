 

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Data fetched');
    }, 1000);
  });
}

 
async function processData() {
  try {
    const message = await fetchData();
    print(message);

     
    const { default: _ } = await import('https://cdn.skypack.dev/lodash');
    const array = [1, 2, 3, 4, 5];
    print('Shuffled array:', _.shuffle(array));

     
    const target = {
      name: 'Advanced JavaScript',
      level: 'High'
    };

    const handler = {
      get: (obj, prop) => {
        if (prop in obj) {
          return `Property "${prop}" found: ${obj[prop]}`;
        } else {
          return `Property "${prop}" is not defined`;
        }
      }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.name);
    print(proxy.level);
    print(proxy.description);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
processData();
