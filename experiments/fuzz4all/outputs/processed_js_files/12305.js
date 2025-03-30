 
class AsyncRange {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }
  
  async *[Symbol.asyncIterator]() {
    for (let i = this.start; i <= this.end; i++) {
       
      await new Promise(res => setTimeout(res, 100));
      yield i;
    }
  }
}

const handler = {
  get: function(target, prop, receiver) {
    if (prop in target) {
      return Reflect.get(...arguments);
    } else {
      return `Property "${prop}" does not exist`;
    }
  }
};

async function main() {
  const range = new Proxy(new AsyncRange(1, 5), handler);
  
  print(range.start);  
  print(range.nonExistentProp);  
  
  for await (let value of range) {
    print(value);  
  }
}

main();
