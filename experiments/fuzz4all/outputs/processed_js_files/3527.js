class Vector {
  constructor(...components) {
    this.components = components;
  }

   
  *[Symbol.iterator]() {
    for (const component of this.components) {
      yield component;
    }
  }

  dot(other) {
    if (!(other instanceof Vector)) {
      throw new Error("Argument must be a Vector");
    }
    return [...this].reduce((acc, val, index) => acc + val * other.components[index], 0);
  }

   
  getMagnitude() {
    return Math.sqrt(this.components.reduce((acc, val) => acc + val ** 2, 0));
  }
}

const proxyHandler = {
  get: (target, prop) => {
    if (prop === 'magnitude') {
      return target.getMagnitude();
    }
    return target[prop];
  }
};

const vectorA = new Proxy(new Vector(1, 2, 3), proxyHandler);
const vectorB = new Proxy(new Vector(4, 5, 6), proxyHandler);

print(`Dot Product: ${vectorA.dot(vectorB)}`);
print(`Magnitude of Vector A: ${vectorA.magnitude}`);
print(`Magnitude of Vector B: ${vectorB.magnitude}`);

 
async function computeAsyncDotProduct(vec1, vec2) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(vec1.dot(vec2));
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });
}

(async () => {
  try {
    const asyncDotProduct = await computeAsyncDotProduct(vectorA, vectorB);
    print(`Async Dot Product: ${asyncDotProduct}`);
  } catch (error) {
    console.error("Error computing dot product:", error);
  }
})();
