const crypto = require('crypto');

 
(async () => {
  try {
    const data = 'Advanced JavaScript Features';

     
    const processedData = data
      .toLowerCase()
      .split('')
      .filter(char => ![' ', '!', ',', '.'].includes(char))
      .map(char => char.charCodeAt(0))
      .reduce((acc, val) => acc + val, 0);

     
    const hashAsync = async (input) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
           
          const hash = crypto.createHash('sha256');
          hash.update(String(input));
          resolve(hash.digest('hex'));
        }, 1000);
      });
    };

     
    const { result } = await hashAsync(processedData).then(hash => ({ result: hash }));
    print(`The SHA-256 hash of the processed data is: ${result}`);

     
    const uniqueChars = new Set([...data.replace(/[^a-zA-Z]/g, '')]);
    print(`Unique characters: ${[...uniqueChars].join(', ')}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
