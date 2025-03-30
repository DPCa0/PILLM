class ComplexFeatureShowcase {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
    this.start();
  }

  async start() {
    print('Starting complex feature showcase...');
    
    try {
      const result = await this.executeComplexPipeline();
      print('Pipeline result:', result);
    } catch (error) {
      console.error('Error in pipeline:', error);
    }
  }

  async executeComplexPipeline() {
    return new Promise((resolve, reject) => {
      try {
        const transformedData = this.data
          .map(num => num * num)
          .filter(num => num > 10)
          .reduce((acc, num) => acc + num, 0);

        setTimeout(() => {
          if (transformedData) {
            resolve(`Sum of squares greater than 10: ${transformedData}`);
          } else {
            reject('No data left after transformation.');
          }
        }, 1000);
      } catch (error) {
        reject(error);
      }
    });
  }

  static async parallelTasks() {
    const delay = ms => new Promise(res => setTimeout(res, ms));

    const task1 = delay(1000).then(() => 'Task 1 completed');
    const task2 = delay(500).then(() => 'Task 2 completed');

    const results = await Promise.all([task1, task2]);
    print('Parallel tasks results:', results);
  }
}

const showcase = new ComplexFeatureShowcase();
ComplexFeatureShowcase.parallelTasks();
