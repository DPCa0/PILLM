 
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

   
  *[Symbol.iterator]() {
    yield this.real;
    yield this.imaginary;
  }

   
  static add(c1, c2) {
    const [r1, i1] = c1;
    const [r2, i2] = c2;
    return new ComplexNumber(r1 + r2, i1 + i2);
  }

   
  format() {
    const complexTag = (strings, real, imaginary) => {
      return `${strings[0]}${real}${strings[1]}${imaginary}${strings[2]}`;
    };
    return complexTag`${this.real} + ${this.imaginary}i`;
  }
}

 
const negativeHandler = {
  set(obj, prop, value) {
    if (value < 0) {
      console.warn(`Negative value detected: ${prop}`);
    }
    obj[prop] = value;
    return true;
  }
};

 
const complexNum = new Proxy(new ComplexNumber(1, 2), negativeHandler);
complexNum.real = -5;  

 
async function calculate() {
  const num1 = new ComplexNumber(3, 4);
  const num2 = new ComplexNumber(5, 6);
  const sum = await new Promise((resolve) =>
    setTimeout(() => resolve(ComplexNumber.add(num1, num2)), 1000)
  );

  print(`Sum: ${sum.format()}`);
}

 
const complexNumValues = [...complexNum];
print(`Complex Number Values: ${complexNumValues}`);

calculate().then(() => {
  print('Calculation completed.');
});
