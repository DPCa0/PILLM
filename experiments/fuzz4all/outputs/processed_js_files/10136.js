 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('URL not provided');
      }
    }, 1000);
  });
};

 
const dataHandler = {
  get: (target, prop) => {
    print(`Accessing property ${prop}`);
    return target[prop];
  }
};

const dataObject = new Proxy({ name: 'Data Object', id: 1 }, dataHandler);

 
const multiply = (x) => (y) => x * y;
const double = multiply(2);

 
const logDetails = ({ name, id, ...rest }) => {
  print(`Name: ${name}, ID: ${id}, Other:`, rest);
};

 
const init = async () => {
  try {
    const dataUrl = 'https://api.example.com/data';
    const data = await fetchData(dataUrl);
    print(data);

    print(double(5));  

    logDetails({ ...dataObject, additional: 'info' });  
  } catch (error) {
    console.error('Error:', error);
  }
};

init();
