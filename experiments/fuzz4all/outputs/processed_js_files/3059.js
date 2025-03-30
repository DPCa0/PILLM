(async () => {
   
  const handler = {
    set: (target, property, value) => {
      print(`Property ${property} set to ${value}`);
      target[property] = value;
      return true;
    }
  };

  const obj = new Proxy({}, handler);
  obj.a = 10;

   
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const asyncFunction = async () => {
    print('Waiting for 1 second...');
    await delay(1000);
    print('1 second passed');
  };

  await asyncFunction();

   
  const { x, y, ...rest } = { x: 1, y: 2, z: 3, w: 4 };
  print(x, y, rest);

   
  const tag = (strings, ...values) => {
    print('Strings:', strings);
    print('Values:', values);
    return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
  };

  const result = tag`This is a ${'tagged'} template ${'literal'}!`;
  print(result);

   
  const numbers = [1, 2, 3, 4, 5];
  const doubled = numbers.map(num => num * 2).filter(num => num > 5);
  print(doubled);
})();
