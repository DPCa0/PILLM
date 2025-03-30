class Point {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get coordinates() {
    return { x: this.#x, y: this.#y };
  }

  distanceTo({ x, y }) {
    return Math.sqrt((this.#x - x) ** 2 + (this.#y - y) ** 2);
  }

  static fromArray([x, y]) {
    return new Point(x, y);
  }
}

const asyncCalcDistance = async (pointA, pointB) => {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  await delay(100);  
  return pointA.distanceTo(pointB);
};

 
(async () => {
  const points = [
    Point.fromArray([0, 0]),
    new Point(3, 4)
  ];
  
  const [first, second] = points.map(({ coordinates }) => coordinates);
  
  const distance = await asyncCalcDistance(points[0], second);
  
  print(`Distance between (${first.x}, ${first.y}) and (${second.x}, ${second.y}) is ${distance}`);
})();
