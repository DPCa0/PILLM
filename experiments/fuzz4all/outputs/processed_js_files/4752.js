 
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  *neighbours() {
    yield new Point(this.x + 1, this.y);
    yield new Point(this.x - 1, this.y);
    yield new Point(this.x, this.y + 1);
    yield new Point(this.x, this.y - 1);
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

const calculate = (numbers) => numbers.reduce((a, b) => a + b, 0);

(async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print('Data fetched:', data.slice(0, 3));

    const numbers = [1, 2, 3, 4, 5];
    print('Sum of numbers:', calculate(numbers));

    const point = new Point(2, 3);
    print('Point Neighbours:');
    for (let neighbour of point.neighbours()) {
      print(`(${neighbour.x}, ${neighbour.y})`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();
