 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: { message: 'Hello, world!' } });
      } else {
        reject(new Error('404 - Not Found'));
      }
    }, 1000);
  });
};

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const generatorProxy = new Proxy(numberGenerator(), {
  get(target, prop, receiver) {
    if (prop === 'next') {
      print('Generating next number...');
    }
    return Reflect.get(target, prop, receiver);
  }
});

 
async function complexFeatureDemo(url) {
  try {
     
    const response = await fetchData(url);
    print(response.data.message);

     
    print('Generated numbers:');
    for (let i = 0; i < 5; i++) {
      print(generatorProxy.next().value);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

 
complexFeatureDemo('https://api.example.com/data');
