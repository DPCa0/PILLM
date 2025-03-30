 
const _private = Symbol('private');
class FancyNumber {
  constructor(number) {
    this[_private] = { number };  
  }

   
  static isFancy(num) {
    return num % 2 === 0 && num % 3 === 0;
  }

   
  *fancyGenerator(limit) {
    let num = this[_private].number;
    while (num < limit) {
      if (FancyNumber.isFancy(num)) yield num;
      num++;
    }
  }

   
  async fancyOperationAsync() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Fancy Result: ${this[_private].number * 2}`);
      }, 1000);
    });
  }
}

 
(async () => {
  const fancyNum = new FancyNumber(1);
  
  for (let fancy of fancyNum.fancyGenerator(20)) {
    print(`Generated fancy number: ${fancy}`);
  }

  const result = await fancyNum.fancyOperationAsync();
  print(result);
})();
