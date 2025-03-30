 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["apple", "banana", "cherry"]);
    }, 1000);
  });
};

 
(async () => {
   
  const [fruit1, fruit2, fruit3] = await fetchData();

   
  const fruitMap = new Map([
    [fruit1, { color: "red", type: "berry" }],
    [fruit2, { color: "yellow", type: "tropical" }],
    [fruit3, { color: "red", type: "berry" }],
  ]);

   
  const fruitArray = [...fruitMap.keys()];

   
  const message = fruitArray
    .map(
      (fruit) =>
        `The ${fruit} is ${fruitMap.get(fruit)?.color} and is a type of ${fruitMap.get(fruit)?.type}.`
    )
    .join("\n");

   
  const handler = {
    get(target, property) {
      print(`Accessing property "${property}"`);
      return target[property];
    },
  };

  const proxyMap = new Proxy(fruitMap, handler);

   
  function* fruitInfo() {
    for (let [fruit, info] of proxyMap) {
      yield `The ${fruit} is ${info.color} and is a type of ${info.type}.`;
    }
  }

   
  for (let info of fruitInfo()) {
    print(info);
  }
})();
