class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  enqueue(task) {
    return new Promise((resolve, reject) => {
      this.queue.push(() => task().then(resolve, reject));
      this.runNext();
    });
  }

  runNext() {
    if (this.running >= this.concurrency || this.queue.length === 0) return;

    this.running++;
    const task = this.queue.shift();
    task().then(() => {
      this.running--;
      this.runNext();
    });
  }
}

async function fetchData(url) {
  const response = await fetch(url);
  return await response.json();
}

function* numberGenerator() {
  let number = 1;
  while (true) {
    yield number++;
  }
}

const generator = numberGenerator();
const queue = new TaskQueue(3);

for (let i = 0; i < 10; i++) {
  queue.enqueue(() => fetchData(`https: 
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
