 
class ComplexFeatureExample {
  constructor() {
    this.data = { message: "Advanced JavaScript Features", numbers: [1, 2, 3, 4, 5] };
  }

  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ status: 200, data: this.data });
      }, 1000);
    });
  }

  async processData() {
    try {
      const { status, data } = await this.fetchData();
      if (status === 200) {
        const { message, numbers } = data;
        print(`Message: ${message}`);
        const [first, ...rest] = numbers;
        print(`First number: ${first}`);
        print(`Rest of numbers: ${rest.join(', ')}`);

         
        const total = [...rest, first].reduce((acc, num) => acc + num, 0);
        print(`Total sum: ${total}`);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
}

 
const example = new ComplexFeatureExample();
example.processData();
