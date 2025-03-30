 

 
const advancedProgram = async () => {
  try {
     
    const fetchData = () =>
      new Promise((resolve) =>
        setTimeout(() => resolve(['apples', 'bananas', 'cherries']), 1000)
      );

     
    const data = await fetchData();

     
    const dataProxy = new Proxy(data, {
      get(target, prop) {
        print(`Accessing ${prop} element`);
        return target[prop];
      },
      set(target, prop, value) {
        print(`Setting ${prop} to ${value}`);
        target[prop] = value;
        return true;
      }
    });

     
    const modifiedData = dataProxy
      .map((item) => item.toUpperCase())
      .filter((item) => item.includes('A'))
      .reduce((acc, item) => `${acc}, ${item}`);

     
    class FruitProcessor {
      static #secretIngredient = 'LOVE';

      static process(fruits) {
        print(`Processing fruits with ${this.#secretIngredient}`);
        return `Processed: ${fruits}`;
      }
    }

     
    const log = (strings, ...values) =>
      console.log(
        strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, '')
      );

     
    log`Final Output: ${FruitProcessor.process(modifiedData)}`;
  } catch (error) {
    console.error('Error in advanced program:', error);
  }
};

 
advancedProgram();
