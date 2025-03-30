const fetch = require('node-fetch');

(async () => {
  try {
    const url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

     
    const response = await fetch(url);
    const data = await response.json();

    const getValueInCurrency = (currency) => {
       
      return data?.bpi[currency]?.rate || 'Currency data not available';
    };

    print('Bitcoin Price Index:');
    
     
    new Map(Object.entries(data.bpi)).forEach((value, key) => {
      print(`${key}: ${value.rate}`);
    });

     
    await new Promise((resolve) => setTimeout(resolve, 1000));
    print(`Value in USD: ${getValueInCurrency('USD')}`);
  } catch (error) {
     
    console.error('An error occurred:', error?.message ?? 'Unknown error');
  }
})();
