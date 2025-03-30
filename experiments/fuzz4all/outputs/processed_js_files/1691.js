 

 
function* numberSequence() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
async function getNumbers(amount) {
  const sequence = numberSequence();
  const numbers = [];
  
  for (let i = 0; i < amount; i++) {
    numbers.push(await Promise.resolve(sequence.next().value));
  }
  
  return numbers;
}

 
const handler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    }
    return `Property ${prop} does not exist.`;
  },
  set: (obj, prop, value) => {
    if (typeof value === 'number') {
      obj[prop] = value;
      return true;
    }
    console.error('Property value must be a number');
    return false;
  }
};

const numbersProxy = new Proxy({}, handler);

 
(async () => {
  try {
     
    const numbers = await getNumbers(5);
    print('Generated Numbers:', numbers);

     
    numbers.forEach((num, index) => {
      numbersProxy[`num${index}`] = num;
    });

    print('Proxy Numbers:', numbersProxy);

     
    numbersProxy.invalidProp = 'Not a number';  
  } catch (error) {
    console.error('Error:', error);
  }
})();
