 
 

const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { name: "JavaScript", type: "Programming Language", version: "ES6+" };
      resolve(data);
    }, 1000);
  });
};

const processData = async () => {
  try {
    const { name, ...rest } = await fetchData();
    print(`Data fetched: ${name}`);
    print(`Additional info: ${JSON.stringify(rest)}`);

    const sequence = generateSequence();
    print(`Generated Sequence: [${[...sequence]}]`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function* generateSequence() {
  for (let i = 1; i <= 3; i++) {
    yield i;
  }
}

processData();
