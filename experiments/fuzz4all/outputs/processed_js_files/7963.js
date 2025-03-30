 
class ComplexNumber {
  constructor(real, imaginary) {
    this.real = real;
    this.imaginary = imaginary;
  }

  static add(a, b) {
    return new ComplexNumber(a.real + b.real, a.imaginary + b.imaginary);
  }

  toString() {
    return `${this.real} + ${this.imaginary}i`;
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

(async () => {
  const dataPromise = fetchData('https://jsonplaceholder.typicode.com/posts');
  
   
  const handler = {
    get: function(target, prop) {
      print(`Property ${prop} accessed`);
      return prop in target ? target[prop] : 42;  
    }
  };
  
  const complex1 = new ComplexNumber(2, 3);
  const complex2 = new ComplexNumber(4, 5);
  const proxyComplex = new Proxy(complex1, handler);

  print(proxyComplex.real);
  print(proxyComplex.imaginary);
  print(ComplexNumber.add(complex1, complex2).toString());
  
  const data = await dataPromise;
  print('Fetched data:', data.slice(0, 3));  
})();
