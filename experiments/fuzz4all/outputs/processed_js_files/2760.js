class ComplexObject {
  #privateField = "I am private";

  constructor() {
    this.publicField = "I am public";
  }

  async processData(data) {
    try {
      const result = await this.#asyncOperation(data);
      return result.map(item => ({
        ...item,
        timestamp: new Date().toISOString()
      }));
    } catch (error) {
      console.error("Error processing data:", error);
      return [];
    }
  }

  #asyncOperation(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Array.isArray(data)) {
          resolve(data.map(item => ({ ...item, processed: true })));
        } else {
          reject(new Error("Invalid data"));
        }
      }, 1000);
    });
  }

  getPrivateField() {
    return this.#privateField;
  }

  static *rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
      yield i;
    }
  }
}

(async () => {
  const obj = new ComplexObject();
  print("Public Field:", obj.publicField);
  print("Private Field:", obj.getPrivateField());

  const data = [{ value: 1 }, { value: 2 }, { value: 3 }];
  const processedData = await obj.processData(data);
  print("Processed Data:", processedData);

  print("Range:");
  for (const num of ComplexObject.rangeGenerator(1, 5)) {
    print(num);
  }
})();
