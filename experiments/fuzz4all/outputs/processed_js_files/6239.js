class AsyncStreamProcessor {
  constructor(dataStream) {
    this.dataStream = dataStream;
  }

  async *asyncGenerator() {
    for await (const chunk of this.dataStream) {
      yield this.processChunk(chunk);
    }
  }

  processChunk(chunk) {
    return chunk.split('').reverse().join('');  
  }

  async executePipeline() {
    const results = [];
    for await (const processedChunk of this.asyncGenerator()) {
      results.push(processedChunk);
    }
    return results;
  }
}

 
(async () => {
  const simulatedDataStream = (async function* () {
    yield 'Hello';
    yield 'world';
    yield 'from';
    yield 'the';
    yield 'AsyncStreamProcessor';
  })();

  const processor = new AsyncStreamProcessor(simulatedDataStream);
  const result = await processor.executePipeline();
  print(result);  
})();
