 

 
const myModule = (() => {
   
  class ComplexNumber {
    #real;
    #imaginary;
    constructor(real, imaginary) {
      this.#real = real;
      this.#imaginary = imaginary;
    }

    static fromObject({ real, imaginary }) {
      return new ComplexNumber(real, imaginary);
    }

    add({ #real: r, #imaginary: i }) {
      return new ComplexNumber(this.#real + r, this.#imaginary + i);
    }

    toString() {
      return `${this.#real} + ${this.#imaginary}i`;
    }
  }

   
  async function fetchComplexData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data.map(({ real, imaginary }) => ComplexNumber.fromObject({ real, imaginary }));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

   
  function* complexNumberGenerator(numbers) {
    for (const num of numbers) {
      yield ComplexNumber.fromObject(num);
    }
  }

   
  async function main() {
    const url = 'https://api.example.com/complexNumbers';
    const complexNumbers = await fetchComplexData(url);

    if (complexNumbers) {
      const [first, ...rest] = complexNumbers;
      print('First:', first.toString());

      const generator = complexNumberGenerator([
        { real: 3, imaginary: 4 },
        { real: 5, imaginary: 6 },
      ]);

      print('Generated:', [...generator].map(cn => cn.toString()));
      const sum = rest.reduce((acc, cn) => acc.add(cn), first);
      print('Sum:', sum.toString());
    }
  }

  return { main };
})();

myModule.main();
