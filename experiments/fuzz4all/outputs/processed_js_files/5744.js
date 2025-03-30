 
const handler = {
  get: (target, prop) => {
    print(`Getting ${prop}`);
    if (prop in target) {
      return target[prop];
    } else {
      throw new Error(`Property ${prop} not found`);
    }
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const obj = new Proxy({ name: 'Alice', age: 25 }, handler);

 
print(obj.name);
obj.age = 26;

 
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

async function processNumbers() {
  const gen = numberGenerator();

  for (let num of gen) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    print(`Processed number: ${num}`);
  }
}

 
async function fetchDataAndLog() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();

    data.slice(0, 3).forEach(post => {
      print(`Post ID: ${post.id}, Title: ${post.title}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
processNumbers();
fetchDataAndLog();

 
const user = {
  profile: {
    email: null
  }
};

const userEmail = user.profile?.email ?? 'Email not available';
print(userEmail);
