 
const fetchData = async () => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
};

 
const handler = {
  get: (target, prop) => {
    if (prop === 'secret') {
      return 'This is a secret!';
    }
    return Reflect.get(target, prop);
  }
};

const obj = new Proxy({ key: 'value' }, handler);

 
function* generateSeries() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

 
const processData = async () => {
  try {
    const response = await fetchData();  
    const processedData = response.data
      .map(x => x * 2)  
      .filter(x => x > 5);  

    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error:', error);
  }
};

 
const UNIQUE_KEY = Symbol('unique');

const uniqueObj = {
  [UNIQUE_KEY]: 'This is a unique value!'
};

 
(() => {
  print('IIFE Executed');
  processData();

  const seriesGenerator = generateSeries();

  print('Generator Series:', seriesGenerator.next().value);  
  print('Generator Series:', seriesGenerator.next().value);  

  print('Proxy Example:', obj.secret);  
  print('Unique Object:', uniqueObj[UNIQUE_KEY]);  
})();
