 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const apiCall = async () => {
  await delay(1000);  
  return { data: 'Hello, world!' };
};

const handler = {
  get: async (target, prop) => {
    const result = await target[prop]();
    print(result.data);  
    return result.data;
  }
};

const asyncAPICall = new Proxy({ call: apiCall }, handler);

 
const uniqueSymbol = Symbol('unique');

(async () => {
  const uniqueObject = {
    [uniqueSymbol]: 'This is a unique property'
  };

  await asyncAPICall.call;  

  print(uniqueObject[uniqueSymbol]);  
})();
