 
import fs from 'fs/promises';
import { promisify } from 'util';
import fetch from 'node-fetch';
import { EventEmitter } from 'events';

 
class DataProcessor extends EventEmitter {
  constructor(data) {
    super();
    this.data = data;
  }

  async filterData(criteriaFn) {
    this.data = this.data.filter(criteriaFn);
    this.emit('dataFiltered', this.data);
    return this;
  }

  mapData(transformFn) {
    this.data = this.data.map(transformFn);
    this.emit('dataMapped', this.data);
    return this;
  }
}

 
async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file', err);
    throw err;
  }
}

 
async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

 
async function* dataGenerator(apiUrls) {
  for (const url of apiUrls) {
    yield await fetchData(url);
  }
}

 
(async function main() {
  const data = await readData('./data.json');
  const processor = new DataProcessor(data);

  processor.on('dataFiltered', (filteredData) => {
    print('Data filtered:', filteredData);
  });

  processor.on('dataMapped', (mappedData) => {
    print('Data mapped:', mappedData);
  });

  await processor
    .filterData(item => item.active)
    .mapData(item => ({ ...item, modified: true }));

   
  const apiUrls = ['https://api.example.com/data1', 'https://api.example.com/data2'];
  for await (const apiData of dataGenerator(apiUrls)) {
    print('API Data:', apiData);
  }
})();
