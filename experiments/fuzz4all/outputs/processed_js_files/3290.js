 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { userId: 1, title: "Async Await Example", completed: true };
      resolve(data);
    }, 1000);
  });
}

 
async function loadData(url) {
  try {
     
    const data = await fetchData(url);
    print('Data fetched successfully:', data);

     
    const { userId, title } = data;
    print(`User ID: ${userId}, Title: ${title}`);

     
    const formattedMessage = customTemplate`Data: User ID is ${userId} with Title: ${title}`;
    print(formattedMessage);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function customTemplate(strings, ...expressions) {
  return strings.reduce((accumulator, str, i) => `${accumulator}${str}<${expressions[i] || ''}>`, '');
}

 
(async () => {
  await loadData('https://jsonplaceholder.typicode.com/todos/1');
})();

 
const handler = {
  get(target, prop, receiver) {
    print(`Property "${prop}" has been accessed`);
    return Reflect.get(...arguments);
  }
};

const proxyData = new Proxy({ user: 'Alice', age: 30 }, handler);
print(proxyData.user);   
print(proxyData.age);
