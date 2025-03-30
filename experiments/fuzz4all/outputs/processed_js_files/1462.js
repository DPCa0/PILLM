 

 
const asyncApiCall = (result, delay) => new Promise(resolve => setTimeout(() => resolve(result), delay));

 
function* dataGenerator(data, chunkSize) {
  for (let i = 0; i < data.length; i += chunkSize) {
    yield data.slice(i, i + chunkSize);
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

 
(async function main() {
   
  const data = Array.from({length: 100}, (_, i) => i + 1);

   
  const gen = dataGenerator(data, 10);

   
  const config = new Proxy({ apiEndpoint: 'https://api.example.com', retryAttempts: 3 }, handler);

   
  config.apiEndpoint = 'https://api.newexample.com';

   
  for (const chunk of gen) {
    const [chunkResult] = await Promise.all([asyncApiCall(chunk, 1000)]);

    print('Processed chunk:', chunkResult);

     
    const [first, second] = chunkResult;
    print(`First: ${first}, Second: ${second}`);
  }

  print('All chunks processed');
})();

