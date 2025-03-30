 
(async () => {
  const fs = await import('fs/promises');

   
  const readConfig = async (filePath) => {
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading config:', error);
    }
  };

   
  class Processor {
    #data;
    
    constructor(data) {
      this.#data = data;
    }
    
    processData() {
      print('Processing data:', this.#data);
      return this.#data.map(item => ({ ...item, processed: true }));
    }
    
    static async fromConfig(filePath) {
      const config = await readConfig(filePath);
      return new Processor(config.data);
    }
  }

   
  async function main() {
    try {
      const processor = await Processor.fromConfig('./config.json');
      const processedData = processor.processData();

       
      const firstItem = processedData[0]?.name ?? 'Default Name';
      print('First processed item name:', firstItem);
      
    } catch (error) {
      console.error('Error in processing:', error);
    }
  }

   
  await main();
})();
