 
const dataMap = new Map([
  ['alpha', new Set([1, 2, 3])],
  ['beta', new Set([4, 5, 6])]
]);

 
const handler = {
  get(target, property) {
    if (property === 'size') {
      return [...target.values()].reduce((sum, set) => sum + set.size, 0);
    }
    return target[property];
  }
};

const proxiedMap = new Proxy(dataMap, handler);

 
async function manipulateData() {
  print('Initial Total Size:', proxiedMap.size);

   
  await new Promise(resolve => setTimeout(() => {
    dataMap.get('alpha').add(7);
    resolve();
  }, 1000));

  print('Updated Total Size:', proxiedMap.size);
}

 
function mergeAndLog(...maps) {
  const mergedMap = new Map();
  maps.forEach(map => {
    for (const [key, set] of map) {
      if (!mergedMap.has(key)) {
        mergedMap.set(key, new Set());
      }
      const currentSet = mergedMap.get(key);
      currentSet = new Set([...currentSet, ...set]);
      mergedMap.set(key, currentSet);
    }
  });
  print('Merged Map:', mergedMap);
}

 
function tag(strings, ...values) {
  return strings.reduce((acc, str, i) => `${acc}${str}<${values[i] || ''}>`, '');
}

const name = "Advanced JS";
print(tag`Welcome to ${name} programming!`);

 
manipulateData();

 
const sym = Symbol('unique');
const obj = {
  [sym]: 'This is a symbol property'
};

print('Symbol Property:', obj[sym]);

 
mergeAndLog(dataMap, new Map([['gamma', new Set([8, 9, 10])]]));
