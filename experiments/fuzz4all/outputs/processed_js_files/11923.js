 

 
const myModule = (() => {
   
  class Utility {
    static fetchData(url) {
       
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (url === 'https://api.example.com/data') {
            resolve({ success: true, data: { items: [1, 2, 3, 4, 5] } });
          } else {
            reject({ success: false, error: 'Invalid URL' });
          }
        }, 1000);
      });
    }
  }

   
  async function getData(url) {
    try {
      const response = await Utility.fetchData(url);
      const { success, data } = response;
      if (success) {
        return data;
      }
    } catch (error) {
      console.error(`Error fetching data: ${error.error}`);
    }
  }

   
  function processData(data) {
    const { items } = data;
    const [first, ...rest] = items;
    print(`First Item: ${first}`);
    print(`Remaining Items: ${rest.join(', ')}`);
  }

   
  return {
    loadAndProcessData: async (url) => {
      const data = await getData(url);
      if (data) {
        processData(data);
      }
    },
  };
})();

 
myModule.loadAndProcessData('https://api.example.com/data');
