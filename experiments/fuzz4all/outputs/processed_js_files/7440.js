 

class Complex {
  constructor(data) {
    this.data = data;
  }
  
   
  processData() {
    return new Promise((resolve) => {
      const mapData = new Map();
      this.data.forEach((item, index) => {
        mapData.set(index, item * 2);  
      });
      resolve(mapData);
    });
  }

  async manipulateData() {
    try {
      const result = await this.processData();
      print('Original Map:', result);
      
       
      const uniqueValues = new Set(result.values());
      print('Unique Values:', [...uniqueValues]);
      
       
      const handler = {
        get(target, prop) {
          if (prop in target) {
            return target[prop];
          }
          return `No such property: ${prop}`;
        }
      };
      const proxyMap = new Proxy(result, handler);
      print('Proxy access valid key:', proxyMap.get(0));
      print('Proxy access invalid key:', proxyMap.get(99));
      
    } catch (error) {
      console.error('Error manipulating data:', error);
    }
  }
}

const data = [1, 2, 3, 4, 5, 5, 3];
const complex = new Complex(data);
complex.manipulateData();
