 
const randomBetween = ((min, max) => () => Math.floor(Math.random() * (max - min + 1)) + min)(1, 100);

 
class AdvancedCalculator {
  constructor(initialValue = 0) {
    this.value = initialValue;
  }

  static description() {
    return 'This class performs advanced arithmetic operations.';
  }

   
  *rangeGenerator(end) {
    for (let i = this.value; i <= end; i++) {
      yield i;
    }
  }

   
  static createWithValidation(initialValue) {
    return new Proxy(new AdvancedCalculator(initialValue), {
      set(target, prop, value) {
        if (prop === 'value' && typeof value !== 'number') {
          throw new TypeError('Value must be a number');
        }
        target[prop] = value;
        return true;
      }
    });
  }

  add(num) {
    this.value += num;
  }

  getValue() {
    return this.value;
  }
}

 
async function asyncExample() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(randomBetween()), 1000);
  });
}

(async () => {
  try {
    print(AdvancedCalculator.description());

    const calculator = AdvancedCalculator.createWithValidation(10);
    calculator.add(5);
    print(`Current Value: ${calculator.getValue()}`);

     
    for (const num of calculator.rangeGenerator(20)) {
      print(num);
    }

    const randomValue = await asyncExample();
    print(`Random Value: ${randomValue}`);

  } catch (error) {
    console.error(error);
  }
})();
