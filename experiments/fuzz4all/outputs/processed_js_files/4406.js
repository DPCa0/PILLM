 
const delay = ms => new Promise(res => setTimeout(res, ms));

 
const arrayObserver = new Proxy([], {
  set(target, property, value) {
    if (typeof value === 'number') {
      print(`Setting index ${property} to ${value}`);
    }
    target[property] = value;
    return true;
  }
});

 
async function main() {
  const data = arrayObserver;
  
  for (let i = 0; i < 5; i++) {
    data[i] = Math.pow(i, 2);   
    await delay(500);           
  }
  
  print('Final array:', data);
}

main().catch(console.error);
