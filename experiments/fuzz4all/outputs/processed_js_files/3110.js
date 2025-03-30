class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  static fromPromise(promise) {
    return new Observable(observer => {
      promise
        .then(data => {
          observer.next(data);
          observer.complete();
        })
        .catch(err => observer.error(err));
    });
  }

  map(transform) {
    return new Observable(observer =>
      this.subscribe({
        next: x => observer.next(transform(x)),
        error: err => observer.error(err),
        complete: () => observer.complete()
      })
    );
  }
}

const asyncFunction = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(42), 1000);
  });

const doubleValue = value => value * 2;

Observable.fromPromise(asyncFunction())
  .map(doubleValue)
  .subscribe({
    next: console.log,
    error: console.error,
    complete: () => console.log('Operation Complete')
  });

 
const targetObject = { a: 1, b: 2 };
const handler = {
  get: (obj, prop) => {
    print(`Property "${prop}" accessed`);
    return obj[prop];
  }
};

const proxyObject = new Proxy(targetObject, handler);

print(proxyObject.a);  
print(proxyObject.b);  
