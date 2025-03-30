class EnhancedPromise extends Promise {
  constructor(executor) {
    const enhancedExecutor = async (resolve, reject) => {
      try {
        const result = await executor(resolve, reject);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    };
    super(enhancedExecutor);
  }

  finally(callback) {
    return super.finally(async () => {
      await callback();
      print('Cleanup done.');
    });
  }

  retry(times) {
    const originalExecutor = this.constructor.prototype.then;
    return new this.constructor((resolve, reject) => {
      const attempt = (n) => {
        originalExecutor.call(this, resolve, async (error) => {
          if (n > 0) {
            print(`Retrying... attempts left: ${n}`);
            attempt(n - 1);
          } else {
            reject(error);
          }
        });
      };
      attempt(times);
    });
  }
}

(async () => {
  const task = new EnhancedPromise((resolve, reject) => {
    const randomSuccess = Math.random() > 0.7;
    setTimeout(() => {
      if (randomSuccess) resolve('Success!');
      else reject('Failure...');
    }, 500);
  });

  try {
    const result = await task.retry(3).finally(() => print('Attempt finished'));
    print(result);
  } catch (error) {
    console.error(error);
  }
})();
