 
async function* fetchUserData(ids) {
  for (const id of ids) {
    await new Promise(resolve => setTimeout(resolve, 100));  
    yield { id, name: `User${id}` };
  }
}

 
const userProxyHandler = {
  get(target, prop) {
    print(`Accessing property ${prop}`);
    return target[prop];
  }
};

 
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, fn(...args));
    }
    return cache.get(key);
  };
};

 
const heavyComputation = memoize((x) => {
  print(`Computing result for ${x}`);
  return x * x;  
});

 
(async () => {
  const userIDs = [1, 2, 3, 4];
  for await (const user of fetchUserData(userIDs)) {
    const proxiedUser = new Proxy(user, userProxyHandler);
    print(`Fetched user: ${proxiedUser.name}`);

     
    print(`Result of heavy computation: ${heavyComputation(proxiedUser.id)}`);
  }

   
  print(`Result of cached computation: ${heavyComputation(2)}`);  
})();
