class AdvancedFeatureShowcase {
  constructor(...nums) {
    this.nums = nums;
  }

   
  static calculate(...args) {
    return args.reduce((acc, num) => acc + num, 0);
  }

   
  get average() {
    return this.nums.length ? this.sum / this.nums.length : 0;
  }

   
  #complexCalculation(multiplier) {
    return this.nums.map(num => num * multiplier);
  }

   
  async calculateComplexAsync(multiplier) {
    return new Promise(resolve => {
      setTimeout(() => {
        const result = this.#complexCalculation(multiplier);
        resolve(result);
      }, 1000);
    });
  }

   
  static showInfo() {
    print("This is a complex showcase of advanced JavaScript features!");
  }

   
  get sum() {
    return AdvancedFeatureShowcase.calculate(...this.nums);
  }
}

 
const example = new AdvancedFeatureShowcase(1, 2, 3, 4, 5);

 
AdvancedFeatureShowcase.showInfo();
print("Sum:", example.sum);
print("Average:", example.average);

 
example.calculateComplexAsync(10).then(result => print("Complex Calculation Result:", result));
