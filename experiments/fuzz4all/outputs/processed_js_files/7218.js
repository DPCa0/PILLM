 
const fetchData = async (url) => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Fetched data from ${url}` });
    }, 1000);
  });
};

const urlHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing ${prop}`);
      return target[prop];
    } else {
      print(`Creating default URL for ${prop}`);
      return `https: 
    }
  }
};

const apiUrls = new Proxy({}, urlHandler);

(async () => {
  try {
     
    let data = await fetchData(apiUrls.user);
    print(data.data);

    data = await fetchData(apiUrls.posts);
    print(data.data);
    
    data = await fetchData(apiUrls.comments);
    print(data.data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
