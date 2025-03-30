const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  return data.map(({ id, value }) => ({
    id,
    doubleValue: value * 2,
    squareValue: value ** 2,
  }));
};

class DataHandler {
  constructor(data) {
    this.data = data;
  }

  filterData(predicate) {
    return new DataHandler(this.data.filter(predicate));
  }

  transformData(transformFn) {
    return new DataHandler(this.data.map(transformFn));
  }

  getResult() {
    return this.data;
  }
}

(async () => {
  try {
    const rawData = await fetchData('https://api.example.com/data');
    const processedData = processData(rawData);
    const handler = new DataHandler(processedData);

    const result = handler
      .filterData(item => item.doubleValue > 10)
      .transformData(item => ({ ...item, extraField: item.doubleValue + 5 }))
      .getResult();

    print(result);
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();
