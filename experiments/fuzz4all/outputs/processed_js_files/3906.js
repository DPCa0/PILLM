 

 
const asyncOperation = (message, timeout) => new Promise(resolve => {
  setTimeout(() => {
    print(message);
    resolve(message);
  }, timeout);
});

 
async function performOperations() {
   
  const [first = 'First', ...rest] = ['First', 'Second', 'Third', 'Fourth'];
  print(first, rest);

   
  function tag(strings, ...values) {
    return strings.reduce((result, str, i) => `${result}${str}<${values[i] || ''}>`, '');
  }
  print(tag`Performing ${rest.length} operations.`);

   
  const operations = new Map([
    ['Second operation', 1000],
    ['Third operation', 500],
    ['Fourth operation', 1500]
  ]);

   
  const operationSymbols = [...operations.keys()].map(key => Symbol(key));

   
  await Promise.all([...operations].map(async ([message, timeout], i) => {
    const result = await asyncOperation(message, timeout);
    print(`Result of ${operationSymbols[i].toString()}: ${result}`);
  }));
}

 
(async () => {
  try {
    await performOperations();
    print('All operations completed successfully.');
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
