(async () => {
   
  const fetchData = () =>
    new Promise((resolve) => setTimeout(() => resolve({ data: "Complex Data" }), 1000));

   
  const loggingHandler = {
    get(target, property) {
      print(`Accessing property '${property}'`);
      return target[property];
    },
    set(target, property, value) {
      print(`Setting property '${property}' to '${value}'`);
      target[property] = value;
      return true;
    },
  };

   
  const [data1, data2] = await Promise.all([fetchData(), fetchData()]);

   
  const proxiedData = new Proxy({ ...data1, ...data2 }, loggingHandler);

   
  const numbers = [1, 2, 3, 4, 5];
  const processedNumbers = numbers
    .map((num) => num * 2)  
    .filter((num) => num > 5)  
    .reduce((acc, num) => acc + num, 0);  

   
  function* generateSequence(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }

   
  for (let value of generateSequence(1, 3)) {
    print(`Generated Value: ${value}`);
  }

   
  const [first, ...rest] = [10, 20, 30, 40];
  const newNumbers = [...rest, 50, 60];

  print(`Proxied Data:`, proxiedData.data);
  print(`Processed Numbers Sum:`, processedNumbers);
  print(`Destructured First: ${first}, Rest: ${rest}`);
  print(`New Numbers Array:`, newNumbers);
})();
