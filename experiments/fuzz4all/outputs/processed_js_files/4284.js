 
const complexFunction = async (input) => {
   
  const { name = 'Anonymous', age = 0, hobbies = [] } = input;

   
  if (hobbies.includes('coding')) {
    const { codingHelper } = await import('./codingHelper.js');
    codingHelper();
  }

   
  const taggedTemplate = (strings, ...values) => {
    return strings.reduce((result, string, i) => {
      return `${result}${string.toUpperCase()}${values[i] ? values[i] : ''}`;
    }, '');
  };

  const message = taggedTemplate`Name: ${name}, Age: ${age}`;

   
  const hobbiesMap = new Map();
  hobbies.forEach((hobby, index) => hobbiesMap.set(index, hobby));

  const uniqueHobbies = new Set(hobbies);

  print(message);
  print('Hobbies:', Array.from(hobbiesMap.values()));
  print('Unique Hobbies:', Array.from(uniqueHobbies));

   
  const hobbyPromises = hobbies.map(hobby => 
    Promise.resolve(`I love ${hobby}`)
  );
  const hobbyMessages = await Promise.all(hobbyPromises);
  print(hobbyMessages);
};

 
const personData = {
  name: 'John Doe',
  age: 25,
  hobbies: ['coding', 'music', 'sports']
};

complexFunction(personData?.info ?? personData);

Note: To execute this code, make sure you have a module `codingHelper.js` with an exported function named `codingHelper` in the same directory as the script.