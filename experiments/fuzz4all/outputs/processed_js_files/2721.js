 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
async function* asyncGenerator() {
  const data = await fetchData();
  for (const item of data) {
    yield item.toUpperCase();
  }
}

 
(async () => {
  const results = [];

   
  for await (const fruit of asyncGenerator()) {
     
    const [firstChar, ...restChars] = fruit;
    
     
    const format = (strings, ...values) => `${strings[0]}${values[0]}...${values[1]}`;
    const formattedOutput = format`${firstChar}${restChars.join('')}`;

     
    const ref = new WeakRef({formattedOutput});
    const deref = ref.deref();

    if (deref) {
      results.push(deref.formattedOutput);
    }
  }

   
  print([...new Set(results)]);
})();
