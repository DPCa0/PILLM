const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  const { map, filter, reduce } = Array.prototype;
  return data
    |> (_ => map.call(_, x => ({ ...x, value: x.value * 2 })))
    |> (_ => filter.call(_, x => x.value > 10))
    |> (_ => reduce.call(_, (acc, curr) => acc + curr.value, 0));
};

const executePipeline = async (url) => {
  try {
    const data = await fetchData(url);
    const result = processData(data);
    print('Processed Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

const createProxy = (target) => {
  return new Proxy(target, {
    get: (obj, prop) => {
      if (prop in obj) {
        print(`Accessing property "${prop}"`);
        return obj[prop];
      }
      throw new ReferenceError(`Property "${prop}" does not exist.`);
    },
  });
};

 
const apiEndpoint = 'https://api.example.com/data';
executePipeline(apiEndpoint);

const data = createProxy({ name: 'John', age: 30 });
print(data.name);
print(data.age);
 
 
