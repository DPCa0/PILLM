class TaskQueue {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  runTask(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this.next();
    });
  }

  next() {
    while (this.running < this.concurrency && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this.next();
        });
    }
  }
}

const fetchUserData = async (id) => {
  const response = await fetch(`https: 
  if (!response.ok) throw new Error('Network response was not ok');
  const user = await response.json();
  print(user.name);
};

const queue = new TaskQueue(2);  

(async () => {
  const userIds = [1, 2, 3, 4, 5];
  await Promise.all(
    userIds.map(id => queue.runTask(() => fetchUserData(id)))
  );
  print('All tasks completed');
})();
