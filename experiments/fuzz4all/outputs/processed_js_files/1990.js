 

 
const fetchData = (timeout, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) resolve(data);
      else reject('Fetch error');
    }, timeout);
  });
};

 
const processData = async () => {
  try {
    const [user, posts] = await Promise.all([
      fetchData(1000, { name: 'Alice', age: 30 }),
      fetchData(1200, [{ title: 'Post 1' }, { title: 'Post 2' }]),
    ]);
    return { user, posts };
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const handler = {
  get: (target, prop) => {
    return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
  },
  set: (target, prop, value) => {
    if (typeof value === 'string') {
      target[prop] = value.toUpperCase();
    } else {
      target[prop] = value;
    }
    return true;
  },
};

// Main execution function
const main = async () => {
  const data = await processData();
  if (data) {
    const proxy = new Proxy(data.user, handler);
    print(`User Name: ${proxy.name}`);
    print(`User Age: ${proxy.age}`);
    proxy.name = 'Bob';  
    print(`Updated User Name: ${proxy.name}`);
    print(`Non-existent Property: ${proxy.email}`);
  }
};

 
main();
