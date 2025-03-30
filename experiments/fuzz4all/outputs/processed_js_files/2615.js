(async () => {
   
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const fetchData = async () => {
    await delay(500);  
    return { user: 'Alice', age: 25 };
  };

   
  const processData = async () => {
    const { user, age } = await fetchData();
    const message = `User ${user} is ${age} years old.`;
    print(message);
    
    const additionalData = { location: 'Earth', occupation: 'Developer' };
    const mergedData = { user, age, ...additionalData };
    
    print(mergedData);
  };

   
  const manipulateDataStructures = () => {
    const map = new Map();
    map.set('name', 'Bob');
    map.set('role', 'Designer');

    map.forEach((value, key) => print(`${key}: ${value}`));

    const set = new Set([1, 2, 3, 4, 5]);
    const filteredSet = new Set([...set].filter(num => num % 2 === 0));

    print(filteredSet);
  };

   
  const highlight = (strings, ...values) => {
    return strings.reduce((acc, str, i) => acc + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
  };

  const userInfo = highlight`The user ${'John Doe'} is a ${'Coder'}.`;
  print(userInfo);

   
  await processData();
  manipulateDataStructures();
})();
