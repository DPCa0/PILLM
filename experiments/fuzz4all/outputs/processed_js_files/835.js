 

 
async function* fetchNumbers() {
  for (let i = 1; i <= 5; i++) {
     
    yield new Promise(resolve => setTimeout(() => resolve(i * 10), 100 * i));
  }
}

 
async function processNumbers() {
   
  let processedNumbers = [];
  
   
  for await (const numPromise of fetchNumbers()) {
     
    const { value: num } = await Promise.resolve({ value: numPromise });
    processedNumbers.push(num);
  }

   
  const doubledNumbers = [...processedNumbers].map(n => n * 2);

  return doubledNumbers;
}

 
(async () => {
  try {
    const result = await processNumbers();
    print('Processed and doubled numbers:', result);
  } catch (error) {
    console.error('Error processing numbers:', error);
  }
})();
