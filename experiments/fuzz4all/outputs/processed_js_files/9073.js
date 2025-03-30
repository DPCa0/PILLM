 
import fetch from 'node-fetch';

 
(async () => {
    try {
         
        const apiURL = `https: 
        
         
        const response = await fetch(apiURL);
        
         
        const { rates } = await response.json();
        
         
        const currencyMap = new Map(Object.entries(rates));
        
         
        const currencyCodes = [...currencyMap.keys()];

         
        const majorCurrencies = currencyCodes.filter(code => ['EUR', 'GBP', 'JPY'].includes(code));
        
         
        const uniqueCurrencies = new Set(majorCurrencies);

         
        for (const currency of uniqueCurrencies) {
             
            print(`1 USD is equivalent to ${currencyMap.get(currency) ?? 'unknown'} ${currency}`);
        }

    } catch (error) {
        console.error('Error fetching the exchange rates:', error);
    }
})();
