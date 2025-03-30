 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fetchData = async () => {
  const data = {
    user: {
      name: 'Alice',
      address: {
        city: 'Wonderland',
        zip: '12345'
      }
    },
    posts: [
      { title: 'Learning JavaScript', content: 'JavaScript is fun!' },
      { title: 'Exploring ES6', content: 'ES6 brings lots of new features!' }
    ]
  };

  await delay(1000);
  return data;
};

const handler = {
  get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} not found`)
};

(async () => {
  try {
    const response = await fetchData();
    const { user: { name, address: { city } }, posts } = response;

    const userProxy = new Proxy({ name, city }, handler);

    print(`User: ${userProxy.name} from ${userProxy.city}`);
    print(`Email: ${userProxy.email}`);  

    posts.forEach(({ title, content }) => {
      print(`Post: ${title} - ${content}`);
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
