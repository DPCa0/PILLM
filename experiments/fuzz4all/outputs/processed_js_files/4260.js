 

 
const user = {
  name: "Alice",
  age: 30,
};

const handler = {
  get(target, prop, receiver) {
    if (prop === "age") {
      print("Accessing age property");
    }
    return Reflect.get(...arguments);
  },
};

const proxyUser = new Proxy(user, handler);

 
async function fetchData() {
   
  const promise = new Promise((resolve) =>
    setTimeout(() => resolve({ data: { scores: [10, 20, 30] } }), 1000)
  );
  return await promise;
}

 
function* squared(numbers) {
  for (let num of numbers) {
    yield num * num;
  }
}

(async function () {
  print(proxyUser.name);
  print(proxyUser.age);  

  const { data: { scores } } = await fetchData();  
  print("Fetched scores:", scores);

   
  const squares = squared(scores);
  for (let square of squares) {
    print("Square:", square);
  }
})();
