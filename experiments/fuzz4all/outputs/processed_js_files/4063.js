class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    print(`${this.name} makes a noise.`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak();
    print(`${this.name} barks.`);
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

const processItems = async () => {
  const items = [new Dog('Rex'), new Dog('Spot')];
  
  for await (const item of items) {
    item.speak();
  }
  
  const data = await fetchData('https://api.example.com/data');
  print(data);
};

processItems();
