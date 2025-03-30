class AsyncResourcePool {
  constructor(createResource, concurrencyLimit = 5) {
    this.createResource = createResource;
    this.concurrencyLimit = concurrencyLimit;
    this.activeResources = new Set();
    this.queue = [];
  }

  async acquire() {
    if (this.activeResources.size >= this.concurrencyLimit) {
      await new Promise(resolve => this.queue.push(resolve));
    }
    const resource = await this.createResource();
    this.activeResources.add(resource);
    return resource;
  }

  release(resource) {
    this.activeResources.delete(resource);
    if (this.queue.length > 0) {
      const resolve = this.queue.shift();
      resolve();
    }
  }
}

async function exampleUsage() {
  const pool = new AsyncResourcePool(async () => {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { id: Math.random() };
  }, 3);

  const resources = await Promise.all(
    Array.from({ length: 10 }, async () => {
      const res = await pool.acquire();
      print(`Acquired resource: ${res.id}`);
       
      await new Promise(resolve => setTimeout(resolve, 2000));
      pool.release(res);
      print(`Released resource: ${res.id}`);
    })
  );
}

exampleUsage().catch(console.error);
