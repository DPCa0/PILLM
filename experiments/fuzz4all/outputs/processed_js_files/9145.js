 
import fetch from 'node-fetch';

 
(async () => {
   
  const url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const rate = data.bpi.USD.rate;

     
    print(`Current Bitcoin rate in USD: ${rate}`);

     
    const target = { currency: 'BTC', amount: 1 };
    const handler = {
      get: (obj, prop) => {
        print(`Accessed property: ${prop}`);
        return obj[prop];
      },
      set: (obj, prop, value) => {
        print(`Updated property: ${prop}, New Value: ${value}`);
        obj[prop] = value;
        return true;
      }
    };

    const proxy = new Proxy(target, handler);
    print(proxy.currency);  
    proxy.amount = 2;             

     
    const conversionRates = new Map();
    conversionRates.set('BTC', parseFloat(rate.replace(',', '')));
    conversionRates.set('ETH', 2500);   

     
    const calculateConversion = (amount, ...currencies) => {
      return currencies.map(currency => amount * conversionRates.get(currency));
    };

    print('Converted Values:', calculateConversion(2, 'BTC', 'ETH'));

  } catch (error) {
    console.error('Error fetching the Bitcoin rate:', error);
  }
})();
