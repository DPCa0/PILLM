 

 
const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: 'Mock data from ' + url });
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
function* processData(data) {
  yield data.toUpperCase();
  yield data.split(' ').join('-');
  yield [...data].reverse().join('');
}

 
(async function main() {
  try {
     
    const result = await fetchData('https://api.example.com/data');
    print('Fetched:', result.data);

     
    const generator = processData(result.data);
    for (const step of generator) {
      print('Processed:', step);
    }

     
    const highlight = (strings, ...values) => {
      return strings.reduce((acc, str, i) => {
        return `${acc}<strong>${str}</strong>${values[i] ? `<em>${values[i]}</em>` : ''}`;
      }, '');
    };

    const user = { name: 'John Doe', role: 'Developer' };
    print(highlight`User: ${user.name}, Role: ${user.role}`);

  } catch (error) {
    console.error('Error:', error);
  }
})();
