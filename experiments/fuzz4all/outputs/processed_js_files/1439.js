 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

 
const createProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      print(`Getting ${String(prop)}`);
      return obj[prop];
    },
    set: (obj, prop, value) => {
      print(`Setting ${String(prop)} to ${value}`);
      obj[prop] = value;
      return true;
    }
  });
};

 
function* fibonacci(limit) {
  let [prev, curr] = [0, 1];
  while (curr <= limit) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

 
(() => {
  const apiURL = 'https://api.spacexdata.com/v4/launches/latest';

  fetchData(apiURL)
    .then((launchData) => {
      print('Latest SpaceX Launch:', launchData.name);
      print('Fibonacci series up to 1000:');
      
       
      for (let num of fibonacci(1000)) {
        print(num);
      }
      
       
      const launchInfo = createProxy({ name: launchData.name });
      print(launchInfo.name);  
      launchInfo.date = launchData.date_local;  
    })
    .catch((error) => console.error('Error fetching data:', error));
})();
