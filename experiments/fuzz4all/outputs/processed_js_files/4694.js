 
import fs from 'fs/promises';
import { EventEmitter } from 'events';
import fetch from 'node-fetch';  

class ComplexFeature extends EventEmitter {
  constructor() {
    super();
    this.data = [];
  }

  async fetchData(url) {
    try {
      const response = await fetch(url);
      this.data = await response.json();
      this.emit('dataFetched', this.data);
    } catch (error) {
      this.emit('error', error);
    }
  }

  processAndSaveData(filePath) {
    this.on('dataFetched', async (data) => {
      try {
        const processedData = data.map(item => ({ id: item.id, name: item.name.toUpperCase() }));
        await fs.writeFile(filePath, JSON.stringify(processedData, null, 2));
        print('Data processed and saved successfully');
      } catch (error) {
        this.emit('error', error);
      }
    });
  }
}

 
const complexFeature = new ComplexFeature();
complexFeature.processAndSaveData('output.json');
complexFeature.fetchData('https://jsonplaceholder.typicode.com/users');

complexFeature.on('error', (error) => {
  console.error('An error occurred:', error);
});
