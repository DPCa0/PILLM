 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Sample Data from ' + url });
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
};

 
(async () => {
  try {
     
    const [data1, data2] = await Promise.all([
      fetchData('https://api.example.com/data1'),
      fetchData('https://api.example.com/data2'),
    ]);

     
    const { data: dataFromApi1 } = data1;
    const { data: dataFromApi2 } = data2;

     
    const formatData = (strings, ...values) =>
      strings.raw.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
    
    print(formatData`Data 1: ${dataFromApi1}\nData 2: ${dataFromApi2}`);

     
    function* dataGenerator() {
      yield* [dataFromApi1, dataFromApi2];
    }

     
    const sequenceMap = new Map();
    const sequenceSymbol = Symbol('dataSequence');

    sequenceMap.set(sequenceSymbol, dataGenerator());

    for (let data of sequenceMap.get(sequenceSymbol)) {
      print(`Processed: ${data}`);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
