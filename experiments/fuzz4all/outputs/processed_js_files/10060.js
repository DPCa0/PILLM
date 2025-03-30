 
async function* asyncNumberSequence(delay, count) {
  for (let i = 1; i <= count; i++) {
    await new Promise(resolve => setTimeout(resolve, delay));
    yield i;
  }
}

 
const handler = {
  get: (target, prop) => {
    print(`Accessing property: ${prop}`);
    return target[prop];
  },
  set: (target, prop, value) => {
    if (prop.startsWith('_')) {
      throw new Error(`Cannot set property: ${prop}`);
    }
    print(`Setting property: ${prop} to ${value}`);
    target[prop] = value;
  }
};

const obj = new Proxy({ name: 'JavaScript', version: 'ES2023' }, handler);

 
function sql(strings, ...expressions) {
  return strings.reduce((result, str, i) => result + str + (expressions[i] ? `'${expressions[i]}'` : ''), '');
}

const tableName = 'users';
const id = 123;
const query = sql`SELECT * FROM ${tableName} WHERE id = ${id}`;
print(query);

 
(function () {
  const array = [1, 2, 3, 4, 5];
  const { length } = array;
  const [first, , third, ...rest] = array;

  print(`Array length: ${length}, First: ${first}, Third: ${third}, Rest: ${rest.join(', ')}`);
})();

 
async function main() {
  for await (let num of asyncNumberSequence(500, 5)) {
    print(`Generated number: ${num}`);
  }

  try {
    obj.newProperty = 'New Value';
    print(obj.newProperty);
    obj._hidden = 'Should not work';  
  } catch (error) {
    console.error(error.message);
  }
}

main();
