 
const fetchData = async (url) => {
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  try {
    print(`Fetching data from ${url}`);
    await delay(1000);  

     
    const data = [
      { id: 1, name: 'Alice', skills: ['JavaScript', 'React'] },
      { id: 2, name: 'Bob', skills: ['Python', 'Django'] },
      { id: 3, name: 'Charlie', skills: ['Java', 'Spring'] },
    ];

     
    const [firstPerson, ...others] = data;

     
    const skilledInJS = data.filter(person => person.skills.includes('JavaScript'))
                            .map(({ name }) => name);

    print(`First Person: ${firstPerson.name}`);
    print(`Others: ${others.map(person => person.name).join(', ')}`);
    print(`People skilled in JavaScript: ${skilledInJS.join(', ')}`);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const apiProxy = new Proxy(fetchData, {
  apply: (target, thisArg, argumentsList) => {
    print(`Called fetchData with args: ${argumentsList}`);
    return target(...argumentsList);
  }
});

apiProxy('https://api.example.com/data');
