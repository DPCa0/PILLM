 
const complexObject = {
  data: [
    { id: 1, name: 'Alice', scores: [99, 82, 91] },
    { id: 2, name: 'Bob', scores: [75, 89, 92] },
    { id: 3, name: 'Charlie', scores: [95, 85, 87] }
  ],
  calculateAverages() {
    return this.data.map(({ name, scores }) => {
      const average = scores.reduce((acc, score) => acc + score, 0) / scores.length;
      return { name, average };
    });
  }
};

 
async function fetchData() {
  const fetchSimulator = (id) => new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ID: ${id}`), Math.random() * 1000);
  });

  const results = await Promise.all(
    complexObject.data.map(item => fetchSimulator(item.id))
  );
  return results;
}

 
const handler = {
  get(target, property, receiver) {
    print(`Accessing property "${property}"`);
    return Reflect.get(target, property, receiver);
  }
};

const proxyObject = new Proxy(complexObject, handler);

 
(async () => {
  print('Average Scores:', proxyObject.calculateAverages());
  const fetchedData = await fetchData();
  print('Fetched Data:', fetchedData);
})();
