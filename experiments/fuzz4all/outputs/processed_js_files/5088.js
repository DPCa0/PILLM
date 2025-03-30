 
async function* dataStream() {
  const data = ['Hello', 'from', 'the', 'data', 'stream'];
  for (const item of data) {
    await new Promise(res => setTimeout(res, 1000));  
    yield item;
  }
}

 
const processChunk = (chunk) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chunk.length < 4) {
        reject(new Error('Chunk is too short!'));
      } else {
        resolve(chunk.toUpperCase());
      }
    }, 500);  
  });
};

 
(async function() {
  try {
    const results = [];
    for await (const chunk of dataStream()) {
      try {
        const processed = await processChunk(chunk);
        results.push(processed);
        print('Processed:', processed);
      } catch (err) {
        console.error('Error processing chunk:', err.message);
      }
    }
    print('Final Results:', results);
  } catch (err) {
    console.error('Error in data stream:', err.message);
  }
})();
