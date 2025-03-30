class AsyncResource {
  constructor(initialValue) {
    this.value = initialValue;
  }

  async process() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        this.value = this.complexOperation(this.value);
        resolve(this.value);
      }, 1000);
    });
  }

  complexOperation(input) {
    return [...input].map((char, idx) => 
      String.fromCharCode(char.charCodeAt(0) + (idx % 2 === 0 ? 1 : -1))
    ).join('');
  }
}

async function executePipeline(...resources) {
  let pipelineResult = await Promise.all(resources.map(res => res.process()));

  return pipelineResult.map((result, idx) => ({
    id: idx,
    output: result
  }));
}

const resource1 = new AsyncResource('Hello');
const resource2 = new AsyncResource('World');

executePipeline(resource1, resource2).then(results => {
  for (const { id, output } of results) {
    print(`Resource #${id}: ${output}`);
  }
});

 
