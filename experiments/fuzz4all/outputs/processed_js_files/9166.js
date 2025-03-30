class Pipeline {
  constructor(...functions) {
    this.functions = functions;
  }

  async execute(input) {
    return this.functions.reduce(
      async (chain, func) => func(await chain),
      Promise.resolve(input)
    );
  }
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const step1 = async (data) => {
  print(`Step 1 received: ${data}`);
  await delay(1000);
  return `${data} processed by step 1`;
};

const step2 = async (data) => {
  print(`Step 2 received: ${data}`);
  await delay(1000);
  return `${data} processed by step 2`;
};

const step3 = async (data) => {
  print(`Step 3 received: ${data}`);
  await delay(1000);
  return `${data} processed by step 3`;
};

(async () => {
  const pipeline = new Pipeline(step1, step2, step3);
  const result = await pipeline.execute('Initial data');
  print(`Pipeline completed with result: ${result}`);
})();
