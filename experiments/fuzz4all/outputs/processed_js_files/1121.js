 
const fetchData = async () => {
   
  const [user, posts] = await Promise.all([
    new Promise(resolve => setTimeout(() => resolve({ id: 1, name: 'Alice' }), 1000)),
    new Promise(resolve => setTimeout(() => resolve([{ id: 101, title: 'First Post' }, { id: 102, title: 'Second Post' }]), 1500))
  ]);

  return { user, posts };
};

 
function* dataGenerator(dataArray) {
  for (let data of dataArray) {
    yield data;
  }
}

 
(async function main() {
  try {
    const { user, posts } = await fetchData();
    print(`Fetched User: ${user.name}`);

    const postGenerator = dataGenerator(posts);
    for (let post of postGenerator) {
      print(`Post Title: ${post.title}`);
    }

     
    const handler = {
      set(target, property, value) {
        if (property === 'age' && typeof value !== 'number') {
          throw new TypeError('Age must be a number');
        }
        target[property] = value;
        return true;
      }
    };
    
    const person = new Proxy({ name: 'John', age: 30 }, handler);
    person.age = 31;  
    print(`Person's new age: ${person.age}`);
    // person.age = 'thirty'; // Uncommenting this line will throw an error

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
