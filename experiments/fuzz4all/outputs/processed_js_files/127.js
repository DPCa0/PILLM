 
 
 
 
 

const delay = ms => new Promise(res => setTimeout(res, ms));

async function fetchData() {
  await delay(1000);
  return { data: 'Hello, Proxy World!' };
}

const handler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property "${prop}"`);
      return target[prop];
    } else {
      throw new Error(`Property "${prop}" does not exist`);
    }
  }
};

const createTaggedTemplate = (literals, ...expressions) => {
  return literals.reduce((result, literal, i) => {
    const expr = expressions[i - 1] ? `<<${expressions[i - 1]}>>` : '';
    return result + expr + literal;
  });
};

(async function main() {
  const data = await fetchData();
  const proxyData = new Proxy(data, handler);

  const myMap = new Map();
  myMap.set('message', proxyData.data);

  const mySet = new Set();
  mySet.add('unique').add('values');

  print(createTaggedTemplate`Message: ${myMap.get('message')}`);
  print('Set has:', ...mySet);
})();
