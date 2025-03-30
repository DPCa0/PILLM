 
function log(target, name, descriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args) {
    print(`Calling ${name} with`, args);
    const result = original.apply(this, args);
    print(`${name} returned`, result);
    return result;
  };
  return descriptor;
}

 
async function* fetchDataSimulator() {
  let count = 0;
  while (count < 5) {
    await new Promise(resolve => setTimeout(resolve, 1000));  
    yield { data: `Data chunk #${++count}` };
  }
}

 
class DataProcessor {
  #processData(chunk) {
    return chunk.data.toUpperCase();
  }

  @log
  processAndStore(chunk) {
    const processed = this.#processData(chunk);
    print('Storing:', processed);
     
    return processed;
  }
}

(async () => {
  const processor = new DataProcessor();
  for await (const chunk of fetchDataSimulator()) {
    processor.processAndStore(chunk);
  }
})();
