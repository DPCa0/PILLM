 
async function complexExample() {
  const fetchData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve({ data: 'Fetched Data', status: 200 }), 1000);
    });
  };

  const handler = {
    get: (target, property) => {
      if (property in target) {
        print(`Property '${property}' accessed.`);
        return target[property];
      } else {
        console.error(`Property '${property}' does not exist.`);
      }
    }
  };

  try {
    const dataProxy = new Proxy(await fetchData(), handler);

    if (dataProxy.status === 200) {
      print(`Success: ${dataProxy.data}`);
    } else {
      print(`Failed with status: ${dataProxy.status}`);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

complexExample();
