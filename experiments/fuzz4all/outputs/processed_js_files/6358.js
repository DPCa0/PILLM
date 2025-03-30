(async () => {
  const delay = ms => new Promise(res => setTimeout(res, ms));

   
  const tracedObject = new Proxy(
    {
      a: 1,
      b: 2
    }, 
    {
      set(target, key, value) {
        print(`Setting ${key} to ${value}`);
        return Reflect.set(target, key, value);
      },
      get(target, key) {
        print(`Getting value of ${key}`);
        return Reflect.get(target, key);
      }
    }
  );

   
  function* delayedValues() {
    yield delay(500).then(() => 'Hello');
    yield delay(500).then(() => 'World');
    yield delay(500).then(() => '!');
  }

  const iterator = delayedValues();

   
  for await (const value of iterator) {
    print(value);
  }

   
  tracedObject.a = 10;
  print(tracedObject.a);

   
  const set1 = new Set([1, 2, 3, 4]);
  const set2 = new Set([3, 4, 5, 6]);
  const mergedSet = new Set([...set1, ...set2]);
  print(mergedSet);

   
  const numbers = [1, 2, 3, 4, 5];
  const mapped = numbers.map(num => num * 2);
  const reduced = mapped.reduce((acc, num) => acc + num, 0);
  print(reduced);

   
  const multilineString = `
    This is an example
    of a multi-line
    template string.
  `;
  print(multilineString);

   
  const person = {
    name: 'Alice',
    contact: {
      email: null
    }
  };
  const email = person.contact?.email ?? 'No email provided';
  print(email);

   
  const { x = 1, y = 2, z = 3 } =