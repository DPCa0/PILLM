class Shape {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `A shape named ${this.name}`;
  }
}

class Polygon extends Shape {
  constructor(name, ...sides) {
    super(name);
    this.sides = sides;
  }

  get perimeter() {
    return this.sides.reduce((total, side) => total + side, 0);
  }

  static fromSidesArray(sidesArray) {
    return new Polygon('Polygon', ...sidesArray);
  }

  describe() {
    return `${super.describe()} with sides ${this.sides.join(', ')}`;
  }
}

async function fetchData(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch data', error);
  }
}

function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

const poly1 = new Polygon('Triangle', 3, 4, 5);
print(poly1.describe());
print('Perimeter:', poly1.perimeter);

const poly2 = Polygon.fromSidesArray([5, 5, 5, 5]);
print(poly2.describe());
print('Perimeter:', poly2.perimeter);

fetchData('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => console.log('Fetched data:', data))
  .catch(error => print('Error:', error));

const generator = numberGenerator();
print(generator.next().value);  
print(generator.next().value);  
print(generator.next().value);  
