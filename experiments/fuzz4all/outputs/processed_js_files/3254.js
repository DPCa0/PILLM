 
const complexObject = {
  name: "AdvancedJS",
  version: 1.0,
  features: {
    async getRandomJoke() {
      try {
        const response = await fetch("https://official-joke-api.appspot.com/random_joke");
        const joke = await response.json();
        print(`Joke: ${joke.setup} - ${joke.punchline}`);
      } catch (error) {
        console.error("Error fetching joke:", error);
      }
    },
    utilities: {
      debounce(func, wait) {
        let timeout;
        return function (...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), wait);
        };
      },
      throttle(func, limit) {
        let lastFunc;
        let lastRan;
        return function (...args) {
          const context = this;
          if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
          } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
              if (Date.now() - lastRan >= limit) {
                func.apply(context, args);
                lastRan = Date.now();
              }
            }, limit - (Date.now() - lastRan));
          }
        };
      },
    },
  },
  async init() {
    print(`Initializing ${this.name} v${this.version}`);
    await this.features.getRandomJoke();

    const debouncedLog = this.features.utilities.debounce(() => {
      print("Debounced!");
    }, 1000);

    const throttledLog = this.features.utilities.throttle(() => {
      print("Throttled!");
    }, 1000);

     
    for (let i = 0; i < 5; i++) {
      debouncedLog();
      throttledLog();
    }
  },
};

 
complexObject.init();
