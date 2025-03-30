 
const asyncOperation = (fn, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn());
    }, delay);
  });
};

 
function* asyncGenerator() {
  let i = 0;
  while (i < 5) {
    yield asyncOperation(() => `Value: ${i++}`);
  }
}

 
const iterator = asyncGenerator();

(async () => {
  try {
     
    const results = await Promise.all([
      iterator.next().value,
      iterator.next().value,
      iterator.next().value,
      iterator.next().value,
      iterator.next().value,
    ]);

     
    const uniqueValues = new Set();
    for (const result of results) {
      print(`Result: ${result}`);
      uniqueValues.add(result);
    }

     
    print('Unique Values:', [...uniqueValues]);

     
    const transformedValues = new Map(
      [...uniqueValues].map((value) => [value, value.length])
    );

     
    print('Transformed Values:');
    transformedValues.forEach((length, value) =>
      console.log(`"${value}" has length: ${length}`)
    );
  } catch (error) {
    console.error('Error:', error);
  }
})();
