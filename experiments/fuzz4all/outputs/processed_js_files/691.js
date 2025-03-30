 

class AsyncMath {
  static async addAsync(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(a + b), 1000);
    });
  }

  static async multiplyAsync(a, b) {
    return new Promise((resolve) => {
      setTimeout(() => resolve(a * b), 1000);
    });
  }
}

async function complexOperation() {
  try {
     
    const [sum, product] = await Promise.all([
      AsyncMath.addAsync(5, 10),
      AsyncMath.multiplyAsync(5, 10),
    ]);

     
    const result = {
      sum,
      product,
      description: `The sum is ${sum}, and the product is ${product}.`
    };

    return result;
  } catch (error) {
    throw new Error(`Error in complexOperation: ${error.message}`);
  }
}

(async () => {
  try {
     
    const result = await complexOperation();
    print(result.description);
  } catch (error) {
    console.error(error);
  }
})();
