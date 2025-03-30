const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
};

const processData = (data) => {
  return data.map(({ id, name, value }) => ({
    id,
    name: name.toUpperCase(),
    value: value * 2,
  }));
};

const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

const url = "https://jsonplaceholder.typicode.com/users";
const memoizedFetch = memoize(fetchData);

(async () => {
  try {
    const data = await memoizedFetch(url);
    const processedData = processData(data);
    
    const { sum, avg } = processedData.reduce(
      (acc, { value }) => {
        acc.sum += value;
        acc.avg = acc.sum / processedData.length;
        return acc;
      },
      { sum: 0, avg: 0 }
    );

    print("Processed Data:", processedData);
    print("Sum:", sum);
    print("Average:", avg);

    const complexObj = {
      items: processedData,
      operations: {
        totalSum: sum,
        averageValue: avg,
      },
      findById: function(id) {
        return this.items.find(item => item.id === id);
      },
    };

    print("Find by ID (1):", complexObj.findById(1));
  } catch (error) {
    console.error("Error:", error);
  }
})();
