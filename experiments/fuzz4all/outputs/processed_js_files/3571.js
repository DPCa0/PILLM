 
(async () => {
   
  const calculateSum = (...numbers) => numbers.reduce((a, b) => a + b, 0);

   
  const fetchRandomNumbers = async () => {
    const response = await fetch('https://www.random.org/integers/?num=5&min=1&max=100&col=1&base=10&format=plain&rnd=new');
    const data = await response.text();
    return data.trim().split('\n').map(Number);
  };

   
  const createValidatedArray = (arr) => {
    return new Proxy(arr, {
      set(target, property, value) {
        if (typeof value !== 'number') {
          throw new TypeError('Value must be a number');
        }
        target[property] = value;
        return true;
      }
    });
  };

  try {
    const randomNumbers = await fetchRandomNumbers();
    print('Random Numbers:', randomNumbers);

    const validatedNumbers = createValidatedArray([]);
    randomNumbers.forEach((num, index) => validatedNumbers[index] = num);

    const sum = calculateSum(...validatedNumbers);
    print('Sum of Random Numbers:', sum);

     
    const message = customTemplate`The sum of the numbers is: ${sum}. Good Luck!`;
    print(message);

  } catch (error) {
    console.error('Error:', error);
  }

   
  function customTemplate(strings, ...values) {
    return strings.reduce((result, str, i) => `${result}${str}${values[i] || ''}`, '').toUpperCase();
  }
})();
