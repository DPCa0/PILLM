 

const fetchData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve([1, 2, 3, 4, 5, 3, 2, 1]), 1000)
  );
};

const processData = async () => {
  const rawData = await fetchData();

  const uniqueData = new Set(rawData);
  const [first, ...rest] = uniqueData;

  const results = rest.map((item) => item * 2).filter((item) => item > 4);

  const output = {
    firstValue: first,
    computedValues: results,
    total: results.reduce((acc, num) => acc + num, 0),
  };

  print(output);
};

processData();
