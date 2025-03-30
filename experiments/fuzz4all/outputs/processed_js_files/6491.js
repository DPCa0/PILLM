 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
    if (!response.ok) throw new Error('Network response was not ok');

     
    const { bpi: { USD: { rate } } } = await response.json();

     
    function currencyTag(strings, value) {
      const [dollars, cents] = value.split('.');
      return `${strings[0]}$${dollars}.${cents.slice(0, 2)}`;
    }

     
    print(currencyTag`The current Bitcoin price in USD is: ${rate}`);
    
     
    const handler = {
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    };

    const proxyObject = new Proxy({}, handler);
    proxyObject.bitcoinPrice = rate;

     
    function* priceGenerator() {
      const prices = [45000, 47000, 49000, 51000];
      for (const price of prices) {
        yield `Predicted future price: $${price}`;
      }
    }

    const priceIterator = priceGenerator();
    for (const prediction of priceIterator) {
      print(prediction);
    }

  } catch (error) {
    console.error('Error fetching and processing data:', error);
  }
}

 
fetchDataAndProcess();
