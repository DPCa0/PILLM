 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["apple", "banana", "cherry", "apple", "date"]);
    }, 1000);
  });
};

 
const trackSet = (set) => {
  return new Proxy(set, {
    get(target, prop) {
      if (prop === 'add') {
        return (value) => {
          print(`Adding value: ${value}`);
          return target.add(value);
        };
      }
      return target[prop];
    }
  });
};

 
(async () => {
  try {
    const data = await fetchData();
    
     
    const uniqueSet = trackSet(new Set(data));

     
    uniqueSet.add("elderberry");
    uniqueSet.add("fig");

     
    const dataMap = new Map([...uniqueSet].map((value, index) => [index, value]));

    print("Unique Data Map:");
    dataMap.forEach((value, key) => print(`Index: ${key}, Value: ${value}`));
  } catch (error) {
    console.error("Error fetching data:", error);
  }
})();
