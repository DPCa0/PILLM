 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const createLoggingProxy = (target) => {
  return new Proxy(target, {
    get(obj, prop) {
      print(`Property '${prop}' has been accessed`);
      return obj[prop];
    },
    set(obj, prop, value) {
      print(`Setting property '${prop}' to '${value}'`);
      obj[prop] = value;
      return true;
    }
  });
};

const main = async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(url);

  if (data) {
    const post = createLoggingProxy(data);

    print(post.title);   
    post.title = 'Updated Title';   

    print(post);   
  }
};

main();
