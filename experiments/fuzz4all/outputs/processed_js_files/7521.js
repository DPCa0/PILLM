class User {
  #name;
  constructor(name) {
    this.#name = name;
  }
  
  getName() {
    return this.#name;
  }
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData() {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5] });
    }, 1000);
  });
}

async function processUserData(user) {
  print(`Processing data for: ${user.getName()}`);
  
  const data = await fetchData();
  
  const [first, second, ...rest] = data.data;
  print(`First: ${first}, Second: ${second}, Rest: ${rest}`);

  await delay(500);
  print('Data processed.');
}

const user = new User('Alice');

(async () => {
  await processUserData(user);
})();

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

const sequence = generateSequence();

print(sequence.next().value);  
print(sequence.next().value);  
print(sequence.next().value);  
