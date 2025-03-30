class Shape {
  constructor(name) {
    this.name = name;
  }

  describe() {
    return `This is a ${this.name}.`;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Rectangle');
    this.width = width;
    this.height = height;
  }

  get area() {
    return this.width * this.height;
  }

  static fromArea(area, aspectRatio = 1) {
    const height = Math.sqrt(area / aspectRatio);
    const width = aspectRatio * height;
    return new Rectangle(width, height);
  }

  describe() {
    return `${super.describe()} It has an area of ${this.area.toFixed(2)} square units.`;
  }
}

(async () => {
  const calculateAsync = (val) => {
    return new Promise((resolve) => setTimeout(() => resolve(val), 100));
  };

  const aspectRatio = 1.6;
  const area = await calculateAsync(160);
  const rect = Rectangle.fromArea(area, aspectRatio);

  print(rect.describe());

  const logShapeInfo = (shape) => {
    print(`Logging: ${shape.describe()}`);
  };

  logShapeInfo(rect);

   
  const handler = {
    get(target, property) {
      print(`Property '${property}' accessed on ${target.name}`);
      return target[property];
    },
  };

  const proxiedRect = new Proxy(rect, handler);
  print(proxiedRect.area);
})();
