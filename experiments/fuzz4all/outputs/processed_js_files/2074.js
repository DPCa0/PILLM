 

 
(async () => {
  if (typeof window !== 'undefined') {
    const { default: axios } = await import('https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js');
    
     
    const user = {
      name: 'Alice',
      age: 25,
    };

    const userProxy = new Proxy(user, {
      get(target, prop, receiver) {
        if (!(prop in target)) {
          console.warn(`Property '${prop}' does not exist on user`);
          return null;
        }
        return Reflect.get(target, prop, receiver);
      },
      set(target, prop, value) {
        if (prop === 'age' && typeof value !== 'number') {
          throw new TypeError('Age must be a number');
        }
        return Reflect.set(target, prop, value);
      }
    });

     
    const fetchData = async (url) => {
      try {
        const response = await axios.get(url);
        print('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

     
    const url = 'https://jsonplaceholder.typicode.com/todos/1';
    fetchData(url);

     
    print(userProxy.name);   
    print(userProxy.address);   
    userProxy.age = 30;   
    try {
      userProxy.age = 'thirty';   
    } catch (error) {
      console.error(error.message);
    }

     
    const promises = [
      axios.get('https://jsonplaceholder.typicode.com/posts/1'),
      axios.get('https://jsonplaceholder.typicode.com/posts/2'),
    ];
    
    Promise.allSettled(promises).then(results => {
      results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          print(`Promise ${index + 1} fulfilled:`, result.value.data);
        } else {
          console.error(`Promise ${index + 1} rejected:`, result.reason);
        }
      });