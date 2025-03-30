 
const randomTimeout = () => new Promise(resolve => {
  const timeout = Math.floor(Math.random() * 1000) + 500;  
  setTimeout(() => resolve(timeout), timeout);
});

 
const complexOperation = async (...data) => {
  print(`Starting operations with data: ${data}`);
  
   
  const [first, second, ...rest] = data;
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);
  
   
  const results = await Promise.all([
    randomTimeout().then(time => `Operation 1 finished in ${time}ms`),
    randomTimeout().then(time => `Operation 2 finished in ${time}ms`)
  ]);
  
   
  const tag = (strs, ...values) => strs.map((str, index) => `${str}${values[index] || ''}`).join('');
  print(tag`Results of operations: ${results[0]}, ${results[1]}`);
  
   
  const summary = rest.map((value, index) => `Index ${index + 2} is ${value}`).join('; ');
  print(`Summary: ${summary}`);
  
   
  return (first?.length ?? 0) + (second?.length ?? 0) + rest.length;
};

 
(async () => {
  const totalLength = await complexOperation('apple', 'banana', 'cherry', 'date', 'fig');
  print(`Total Length: ${totalLength}`);
})();
