const fetch = require('node-fetch');

(async () => {
  try {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const getExchangeRate = async (currency) => {
      const response = await fetch(`https: 
      const data = await response.json();
      return data.rates[currency];
    };

    const performCalculations = async () => {
      const usdToEur = await getExchangeRate('EUR');
      print(`1 USD = ${usdToEur} EUR`);

      const nums = [5, 10, 15, 20];
      const [a, ...rest] = nums;
      print('First number:', a);

      const sum = rest.reduce((acc, val) => acc + val, 0);
      print('Sum of the rest:', sum);

      await delay(2000);
      const doubled = nums.map((num) => num * 2);
      print('Doubled numbers:', doubled);

      const allPromises = doubled.map(async (num) => {
        await delay(500);
        return num + await getExchangeRate('GBP');
      });

      const results = await Promise.all(allPromises);
      print('Results after GBP conversion:', results);
    };

    performCalculations();
  } catch (error) {
    console.error('Error:', error);
  }
})();
