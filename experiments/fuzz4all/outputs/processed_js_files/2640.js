class Deferred {
  constructor() {
    this.promise = new Promise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
  }

  resolve(value) {
    this._resolve(value);
  }

  reject(reason) {
    this._reject(reason);
  }
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function* asyncGenerator() {
  const values = ['Hello', 'Async', 'World'];
  for (const value of values) {
    await delay(500);
    yield value;
  }
}

function observableFromAsyncGenerator(asyncIterable) {
  return {
    subscribe(observer) {
      const iterator = asyncIterable[Symbol.asyncIterator]();

      const processNext = () => {
        iterator.next().then(result => {
          if (result.done) {
            observer.complete();
          } else {
            observer.next(result.value);
            processNext();
          }
        }).catch(err => observer.error(err));
      };

      processNext();

      return {
        unsubscribe() {
           
          print('Unsubscribed');
        }
      };
    }
  };
}

const observable = observableFromAsyncGenerator(asyncGenerator());

const subscription = observable.subscribe({
  next(value) { print(value); },
  error(err) { console.error('Error:', err); },
  complete() { print('Finished'); }
});

 
const deferred = new Deferred();

deferred.promise
  .then(value => console.log('Resolved with:', value))
  .catch(err => console.error('Promise Error:', err));

 
setTimeout(() => deferred.resolve('Success!'), 2000);
