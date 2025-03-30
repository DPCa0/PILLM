class Singleton {
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    this.timestamp = new Date();
    Singleton.instance = this;
  }

  getTime() {
    return this.timestamp;
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const processData = async (url) => {
  try {
    const data = await fetchData(url);
    const filteredData = data.filter((item) => item.active);
    print(filteredData.map(({ name }) => name));
  } catch (error) {
    console.error('Error:', error);
  }
};

(async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/users',
    'https://jsonplaceholder.typicode.com/posts',
  ];
  
   
  await Promise.all(urls.map(processData));

  const instance1 = new Singleton();
  const instance2 = new Singleton();
  
  print('Singleton time:', instance1.getTime());
  print('Instances are equal:', instance1 === instance2);  
})();
