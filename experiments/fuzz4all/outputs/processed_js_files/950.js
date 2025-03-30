 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 

class DataManager extends EventEmitter {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async readData() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      this.emit('error', error);
    }
  }

  async saveData(newData) {
    try {
      const currentData = await this.readData();
      const mergedData = { ...currentData, ...newData };
      await fs.writeFile(this.filePath, JSON.stringify(mergedData, null, 2));
      this.emit('dataSaved', mergedData);
    } catch (error) {
      this.emit('error', error);
    }
  }
}

 
const dataObserver = new Proxy({}, {
  set(target, key, value) {
    print(`Property ${key} set to ${value}`);
    target[key] = value;
    return true;
  }
});

 
async function main() {
  const dataManager = new DataManager('./data.json');

  dataManager.on('error', (error) => {
    console.error('An error occurred:', error);
  });

  dataManager.on('dataSaved', (data) => {
    print('Data successfully saved:', data);
  });

   
  if (true) {
    const { randomUUID } = await import('crypto');
    dataObserver.uuid = randomUUID();
  }

   
  for await (const dataChunk of dataManager.readData()) {
    print('Processing data chunk:', dataChunk);
  }

  await dataManager.saveData({ timestamp: new Date().toISOString() });
}

main().catch(console.error);
