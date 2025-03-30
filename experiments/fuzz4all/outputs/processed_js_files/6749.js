 

 
const fetchUserData = async () => {
   
  const fetchData = () => new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 34 },
        { id: 3, name: 'Charlie', age: 22 }
      ]);
    }, 1000);
  });

  try {
     
    const data = await fetchData();
    
     
    const formattedData = data.map(({ id, name, age }) => ({
      id,
      user: `${name} (${age} years old)`
    }));

     
    print('Formatted User Data: ', JSON.stringify(formattedData, null, 2));
  } catch (error) {
     
    console.error('An error occurred while fetching user data:', error);
  }
};

 
const highlight = (strings, ...values) => 
  strings.reduce((result, str, i) => `${result}${str}<strong>${values[i] || ''}</strong>`, '');

 
fetchUserData();

 
const greetingMessage = highlight`Hello, ${'world'}! Welcome to ${'JavaScript'} programming.`;
print(greetingMessage);

 
class MathUtils {
  static add(a, b) {
    return a + b;
  }
  
  static subtract(a, b) {
    return a - b;
  }
}

print(`Addition Result: ${MathUtils.add(5, 7)}`);
print(`Subtraction Result: ${MathUtils.subtract(10, 3)}`);
