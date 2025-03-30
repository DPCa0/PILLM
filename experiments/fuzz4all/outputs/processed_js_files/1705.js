 

 
const resultCache = new Map();

 
const functionProxyHandler = {
  apply: async function(target, thisArg, argumentsList) {
    const key = JSON.stringify(argumentsList);
    if (resultCache.has(key)) {
      print('Fetching from cache:', key);
      return Promise.resolve(resultCache.get(key));
    }
    print('Computing result for:', key);
    const result = await target.apply(thisArg, argumentsList);
    resultCache.set(key, result);
    return result;
  }
};

 
async function fetchData(number) {
  await new Promise(resolve => setTimeout(resolve, 1000));  
  return number * 2;
}

 
const proxiedFetchData = new Proxy(fetchData, functionProxyHandler);

 
(async function main() {
  print(await proxiedFetchData(5));  
  print(await proxiedFetchData(5));  
  print(await proxiedFetchData(10));  
  print(await proxiedFetchData(10));  
})();
