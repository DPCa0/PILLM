 

const apiSimulation = (url) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (url === 'https://api.example.com/data') {
      resolve({ data: { user: 'Alice', age: 30 } });
    } else {
      reject(new Error('404: Not Found'));
    }
  }, 1000);
});

const fetchData = async (url) => {
  try {
    const { data: { user, age } } = await apiSimulation(url);
    return { user, age };
  } catch (error) {
    console.error(error.message);
    return null;
  }
};

const processData = ({ user, age }) => {
  const proxyHandler = {
    get: (target, property) => {
      if (property in target) {
        return `Accessed ${property}: ${target[property]}`;
      } else {
        return `Property ${property} not found`;
      }
    }
  };
  
  const userInfo = { user, age };
  const proxy = new Proxy(userInfo, proxyHandler);
  
  print(proxy.user);
  print(proxy.age);
  print(proxy.email);  
};

const executeProgram = async () => {
  const url = 'https://api.example.com/data';
  const data = await fetchData(url);

  if (data) {
    processData(data);
  }
};

executeProgram();
