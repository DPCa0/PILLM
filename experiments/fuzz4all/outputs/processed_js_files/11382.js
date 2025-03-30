 

const fetchData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    
    const data = await response.json();

     
    const uniqueTitles = new Set();
    const transformedData = data.map(({ id, title, body }) => {
      uniqueTitles.add(title);
      return {
        id,
        summary: title.length > 15 ? `${title.slice(0, 12)}...` : title,
        details: `${body.slice(0, 50)}...`,
      };
    });

     
    const printTransformedData = ({ summary, details } = {}) => {
      print(`Summary: ${summary}\nDetails: ${details}\n`);
    };
    
    for (const item of transformedData) {
      printTransformedData(item);
    }

    print(`Unique Titles Count: ${uniqueTitles.size}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

fetchData();

 
const target = {
  message1: "hello",
  message2: "everyone",
};

const handler = {
  get: function(target, prop, receiver) {
    if (prop === 'message1') {
      return 'Hello, Proxy!';
    }
    return Reflect.get(...arguments);
  },
};

const proxy = new Proxy(target, handler);
print(proxy.message1);  
print(proxy.message2);  
