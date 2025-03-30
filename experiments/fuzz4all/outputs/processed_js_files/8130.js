 
const dataFetcher = {
  data: ['apple', 'banana', 'cherry', 'date', 'elderberry'],
  delay: 500,
  async *[Symbol.asyncIterator]() {
    for (const item of this.data) {
      await new Promise(resolve => setTimeout(resolve, this.delay));
      yield item;
    }
  }
};

 
(async () => {
  try {
    print("Fetching data...");

     
    for await (const fruit of dataFetcher) {
      print(`Processing: ${fruit}`);

       
      const log = (strings, ...values) => {
        print(strings[0] + values.join(strings[1]));
      };
      log`Processed: ${fruit}`;
    }

     
    const config = { apiKey: undefined };
    const apiKey = config?.apiKey ?? 'default-key';
    print(`Using API key: ${apiKey}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();
