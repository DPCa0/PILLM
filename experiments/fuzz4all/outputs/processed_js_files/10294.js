 

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function fetchData() {
  await delay(1000);
  return { user: 'John Doe', email: 'john.doe@example.com' };
}

 
const userHandler = {
  get: (target, prop) => {
    print(`Accessing ${prop}`);
    return target[prop];
  }
};

 
function* userDataGenerator(data) {
  yield `Name: ${data.user}`;
  yield `Email: ${data.email}`;
}

(async function main() {
   
  const userData = await fetchData();

   
  const userProxy = new Proxy(userData, userHandler);

   
  const dataGenerator = userDataGenerator(userProxy);

  for (let info of dataGenerator) {
    print(info);
  }
})();
