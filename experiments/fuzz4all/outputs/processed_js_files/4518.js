 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'Alice', balance: 250 });
    }, 1000);
  });
};

 
const handler = {
  get(target, property, receiver) {
    print(`Getting ${property}`);
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value, receiver) {
    print(`Setting ${property} to ${value}`);
    return Reflect.set(target, property, value, receiver);
  }
};

 
(async () => {
  try {
    const data = await fetchData();
    const { user, balance } = new Proxy(data, handler);

    print(`User: ${user}`);
    print(`Balance: $${balance}`);

     
    data.balance += 50;
    print(`New Balance: $${data.balance}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
