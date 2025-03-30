 
async function* asyncGenerator() {
  for (let i = 1; i <= 3; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(`Value ${i}`), 1000));
  }
}

async function processAsyncGenerator() {
  for await (const promise of asyncGenerator()) {
    print(promise);
  }
}

const dataHandler = {
  data: { a: 1, b: { c: 3, d: 4 } },
  fetch() {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.data), 500)
    );
  },
};

async function main() {
  const { a, b: { c, d } } = await dataHandler.fetch();
  print(`Destructured values: a = ${a}, c = ${c}, d = ${d}`);
  
  await processAsyncGenerator();
  
  print("All tasks completed!");
}

main().catch(console.error);
