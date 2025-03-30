 

 
export const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

 
export default class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  processData() {
     
    return this.data.map(({ id, value }) => `Item ${id}: ${value}`).join('\n');
  }
}

 
(async () => {
   
  const { default: DataProcessor, fetchData } = await import('./dataModule.js');
  
   
  const sampleData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');

   
  const processor = new DataProcessor([{ id: 1, value: sampleData.title }]);

   
  print(processor.processData());
})();
