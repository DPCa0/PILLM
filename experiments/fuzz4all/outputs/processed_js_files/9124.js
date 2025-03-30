 

 
export const arithmeticModule = (() => {
  const add = (a, b) => a + b;
  const subtract = (a, b) => a - b;
  const multiply = (a, b) => a * b;
  const divide = (a, b) => a / b;
  
  return { add, subtract, multiply, divide };
})();

 
const simulateDelay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
const performOperations = async ({ a, b }) => {
  try {
    const { add, subtract, multiply, divide } = arithmeticModule;

     
    await simulateDelay(500);

     
    print(`Adding: ${a} + ${b} = ${add(a, b)}`);
    print(`Subtracting: ${a} - ${b} = ${subtract(a, b)}`);
    print(`Multiplying: ${a} * ${b} = ${multiply(a, b)}`);
    print(`Dividing: ${a} / ${b} = ${divide(a, b)}`);
  } catch (error) {
    console.error("An error occurred during operations:", error);
  }
};

 
const numbers = { a: 10, b: 5 };
performOperations(numbers).then(() => {
  print("Operations completed.");
});
