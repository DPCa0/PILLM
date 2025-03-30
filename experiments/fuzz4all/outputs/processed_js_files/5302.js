 
const fetchData = (() => {
  const cache = new Map();

  return async (url) => {
    if (cache.has(url)) {
      print('Fetching from cache:', url);
      return cache.get(url);
    }
    
    print('Fetching from network:', url);

    const response = await fetch(url);
    const data = await response.json();

    cache.set(url, data);

    return data;
  };
})();

 
let x = 5, y = 10;
[x, y] = [y, x];
print(`Swapped values: x = ${x}, y = ${y}`);

 
class Rectangle {
  static shapeName = 'Rectangle';

  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set width(newWidth) {
    this._width = newWidth;
  }

  set height(newHeight) {
    this._height = newHeight;
  }

  static describe() {
    print(`This is a ${this.shapeName}`);
  }
}

 
Rectangle.describe();
const rect = new Rectangle(10, 20);
print(`Area: ${rect.area}`);
rect.width = 15;
print(`New Area: ${rect.area}`);

 
const uniqueID = (() => {
  const id = Symbol('id');
  return () => id;
})();

print('Unique ID:', uniqueID() === uniqueID());  

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetchData(url);
    print('Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();
