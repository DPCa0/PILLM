 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(Math.random()), 100));

 
(async function manageData() {
  const dataPoints = await Promise.all([fetchData(), fetchData(), fetchData()]);
  
   
  const uniqueData = [...new Set(dataPoints)];
  const total = uniqueData.reduce((acc, val) => acc + val, 0);
  const average = total / uniqueData.length;
  
  print(`Fetched data points: ${uniqueData}`);
  print(`Total: ${total.toFixed(2)}`);
  print(`Average: ${average.toFixed(2)}`);
  
   
  const config = {
    threshold: 0.5
  };
  
  const configProxy = new Proxy(config, {
    set(target, property, value) {
      print(`Config change: Setting ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });

   
  configProxy.threshold = 0.7;

   
  const aboveThreshold = uniqueData.filter(value => value > configProxy.threshold);
  print(`Data points above threshold (${configProxy.threshold}): ${aboveThreshold}`);
})();
