class EnhancedArray extends Array {
  constructor(...args) {
    super(...args);
  }
  
  async mapAsync(callback) {
    return Promise.all(this.map(async (item, index, array) => await callback(item, index, array)));
  }
}

const delayedUppercase = (str) => new Promise(resolve => 
  setTimeout(() => resolve(str.toUpperCase()), 100)
);

const data = new EnhancedArray('hello', 'world', 'javascript', 'async');

(async () => {
  try {
    const results = await data.mapAsync(async (word) => {
      print(`Processing: ${word}`);
      return await delayedUppercase(word);
    });

    print('Results:', results);
    
    const { length } = results;
    print(`Processed ${length} words.`);
    
  } catch (error) {
    console.error('Error processing:', error);
  }
})();
