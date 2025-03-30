 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
      ]);
    }, 1000);
  });
};

 
const createProxy = (data) => {
  return new Proxy(data, {
    get(target, prop) {
      if (prop === 'filterByAge') {
        return (ageLimit) => target.filter(person => person.age > ageLimit);
      }
      if (prop === 'addPerson') {
        return (person) => target.push(person);
      }
      return target[prop];
    }
  });
};

 
(async () => {
   
  const people = await fetchData();

   
  const proxiedPeople = createProxy(people);

   
  proxiedPeople.addPerson({ id: 4, name: 'Dave', age: 40 });

   
  const filteredPeople = proxiedPeople.filterByAge(30);

   
  const resultString = filteredPeople.map(person =>
    `${person.name} (${person.age} years old)`).join(', ');

  print(`People older than 30: ${resultString}`);
})();
