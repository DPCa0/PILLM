 
const sumAll = (...nums) => nums.reduce((acc, num) => acc + num, 0);

 
class ComplexNumber {
  #real;
  #imaginary;

  constructor(real, imaginary) {
    this.#real = real;
    this.#imaginary = imaginary;
  }

   
  #formatComplex() {
    return `${this.#real} + ${this.#imaginary}i`;
  }

   
  add(complex = null) {
    if (complex?.#real == null || complex?.#imaginary == null) {
      console.error('Invalid complex number');
      return this.#formatComplex();
    }
    return new ComplexNumber(
      this.#real + (complex.#real ?? 0),
      this.#imaginary + (complex.#imaginary ?? 0)
    ).#formatComplex();
  }
}

 
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const dataMap = new Map(Object.entries(data));
    return dataMap;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  const number1 = new ComplexNumber(3, 4);
  const number2 = new ComplexNumber(1, 2);
  print('Complex Addition:', number1.add(number2));  

  print('Sum of numbers:', sumAll(1, 2, 3, 4, 5));  

  const apiData = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('API Data:', apiData);
})();
