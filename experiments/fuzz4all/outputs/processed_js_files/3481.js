 

const fetchData = async (url) => {
   
  const response = await new Promise((resolve) =>
    setTimeout(() => resolve({ json: () => ({ data: [1, 2, 3, 4, 5] }) }), 1000)
  );
  return response.json();
};

const processData = ({ data }) => {
   
  const [first, second, ...rest] = data;
  return rest.map((num) => num * 2);
};

const executePipeline = async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    const processedData = processData(data);

     
    print(`Processed Data: ${processedData.join(', ')}`);

     
    const _private = new WeakMap();

    class ExampleClass {
      constructor(value) {
        this.id = Symbol('id');
        _private.set(this, { value });
      }

      getValue() {
        return _private.get(this).value;
      }
    }

    const exampleInstance = new ExampleClass(processedData);
    print(`Private Value: ${exampleInstance.getValue()}`);
  } catch (error) {
    console.error('Error:', error);
  }
};

executePipeline();
