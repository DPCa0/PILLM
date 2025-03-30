 

 
class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#width = width;
    this.#height = height;
  }

  #area() {
    return this.#width * this.#height;
  }

  getArea() {
    return this.#area();
  }

  static async createRectangle(width, height) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(new Rectangle(width, height));
      }, 1000);
    });
  }
}

 
const calculateTotalArea = (rectangles, ...extraRectangles) => {
  const allRectangles = [...rectangles, ...extraRectangles];
  return allRectangles.reduce((acc, rectangle) => acc + rectangle.getArea(), 0);
};

 
(async () => {
  try {
     
    const [rect1, rect2] = await Promise.all([
      Rectangle.createRectangle(5, 10),
      Rectangle.createRectangle(3, 7)
    ]);

     
    const rect3 = new Rectangle(4, 4);
    
     
    const totalArea = calculateTotalArea([rect1, rect2], rect3);
    
     
    print(`The total area of the rectangles is: ${totalArea}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();
