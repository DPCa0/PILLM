 

 
const fetchData = async (url) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Data from ${url}`);
    }, 1000);
  });
};

 
const FETCH_HANDLER = Symbol('fetchHandler');

 
const apiProxyHandler = {
  get(target, prop, receiver) {
    if (!(prop in target)) {
      print(`Fetching data for ${String(prop)}...`);
      return async () => {
        const data = await fetchData(`https: 
        target[prop] = data;  
        return data;
      };
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const api = new Proxy({}, apiProxyHandler);

 
(async () => {
  const userData = await api.userData();   
  print(userData);

  const postsData = await api.postsData();   
  print(postsData);

  const cachedUserData = await api.userData();   
  print(cachedUserData);
})();
