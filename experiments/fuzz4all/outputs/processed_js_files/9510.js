class CustomArray extends Array {
  async asyncForEach(callback) {
    for (let i = 0; i < this.length; i++) {
      await callback(this[i], i, this);
    }
  }
}

async function main() {
  const data = new CustomArray(1, 2, 3, 4, 5);

  const asyncTask = async (num) => {
    return new Promise((resolve) =>
      setTimeout(() => {
        print(`Processing ${num}`);
        resolve(num * 2);
      }, 1000)
    );
  };

  const processArray = async (arr) => {
    const results = [];
    await arr.asyncForEach(async (num) => {
      const result = await asyncTask(num);
      results.push(result);
    });
    return results;
  };

  try {
    const results = await processArray(data);
    print('Results:', results);
  } catch (error) {
    console.error('Error:', error);
  }
}

main();
