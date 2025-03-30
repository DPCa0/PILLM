 

class RandomNumberGenerator {
  constructor(min, max) {
    [this.min, this.max] = [min, max];
  }

  generateRandomNumber() {
    return new Promise((resolve) => {
      const random = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
      setTimeout(() => resolve(random), 1000);
    });
  }
}

async function fetchAndProcessData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const { title, id } = data;
    print(`Fetched data with title: ${title} and ID: ${id}`);

    const rng = new RandomNumberGenerator(1, 100);
    const randomNumber = await rng.generateRandomNumber();
    print(`Generated random number: ${randomNumber}`);
    
  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

fetchAndProcessData('https://jsonplaceholder.typicode.com/posts/1');
