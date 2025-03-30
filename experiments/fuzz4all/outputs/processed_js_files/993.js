 
import fs from 'fs/promises';
import axios from 'axios';

 
(async () => {
    try {
         
        const { data } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');

         
        const bitcoinPrice = data?.bpi?.USD?.rate_float ?? 'Price not available';
        
         
        const { chartName, disclaimer } = data;
        const output = `
            ${chartName} Current Price:
            USD: $${bitcoinPrice}

            Disclaimer: ${disclaimer}
        `;

         
        const formatOutput = (strings, ...values) => 
            strings.reduce((result, str, i) => result + str + (values[i] || ''), '');

         
        print(formatOutput`${output}`);

         
        await fs.writeFile('bitcoinPrice.txt', output);

        print('Data has been written to bitcoinPrice.txt');
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();
