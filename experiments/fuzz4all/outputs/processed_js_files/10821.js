 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * 1000)));

 
async function* dataGenerator() {
  const data = ['Alpha', 'Beta', 'Gamma', 'Delta'];
  for (const item of data) {
    await randomDelay();
    yield item;
  }
}

 
const processData = async () => {
  const results = [];
  for await (const item of dataGenerator()) {
     
    const processed = item
      .split('')
      .map((char, index) => index % 2 === 0 ? char.toUpperCase() : char.toLowerCase())
      .filter(char => 'aeiou'.includes(char.toLowerCase()))
      .join('');
    results.push({ original: item, processed });
  }

   
  const [first, ...rest] = results;
  print('First Processed:', first);

   
  const modifiedResults = [...rest, { original: 'Epsilon', processed: 'Ei' }];
  print('Modified Results:', modifiedResults);
};

 
processData()
  .then(() => console.log('Processing completed successfully!'))
  .catch(error => console.error('Error during processing:', error));
