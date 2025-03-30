 

 
async function* asyncDataStream() {
  const data = ['JavaScript', 'is', 'awesome!'];
  for (const item of data) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield item;
  }
}

 
const handler = {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
(async function main() {
  const dataProxy = new Proxy({ message: '' }, handler);
  
  for await (const word of asyncDataStream()) {
    dataProxy.message += word + ' ';
    print(dataProxy.message.trim());
  }
})();
