 
import { promises as fs } from 'fs';

 
(async function complexFunction() {
  try {
     
    const data = await fs.readFile('./data.json', 'utf8');

     
    const items = JSON.parse(data);

     
    const processItems = items.map(({ name, price, tags = [] }) => ({
      name: name.toUpperCase(),
      price: price * 1.2,
      tags: [...tags, 'processed']
    }));

     
    const totalPrice = processItems.reduce((acc, { price }) => acc + price, 0);

    print('Processed Items:', processItems);
    print('Total Price:', totalPrice.toFixed(2));
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();
Note: The program assumes there is a `data.json` file present in the same directory with a valid JSON array of items.