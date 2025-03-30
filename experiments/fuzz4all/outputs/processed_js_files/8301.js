 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

class Processor {
  constructor(data) {
    this.data = data;
  }

  *[Symbol.iterator]() {
    for (const item of this.data) {
      yield { ...item, processed: true };
    }
  }

  processData() {
    return [...this];
  }
}

const transformData = (data) => {
  return data.map((item) => ({ ...item, transformed: true }));
};

(async () => {
  const dataUrl = 'https://jsonplaceholder.typicode.com/posts';
  const rawData = await fetchData(dataUrl);

  if (rawData) {
    const processor = new Processor(rawData);
    const processedData = processor.processData();

    print('Processed Data:', processedData);

    const transformedData = transformData(processedData);
    print('Transformed Data:', transformedData);
  }
})();
