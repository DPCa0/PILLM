class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }
  
  static fromEvent(element, eventName) {
    return new Observable(observer => {
      const handler = event => observer.next(event);
      element.addEventListener(eventName, handler);
      return {
        unsubscribe: () => element.removeEventListener(eventName, handler)
      };
    });
  }
  
  map(transform) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => observer.next(transform(value))
      });
    });
  }
  
  filter(predicate) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => predicate(value) && observer.next(value)
      });
    });
  }
  
  subscribe(observer) {
    return this._subscribe(observer);
  }
}

const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
};

const inputElement = document.querySelector('input');

const inputObservable = Observable.fromEvent(inputElement, 'input')
  .map(event => event.target.value)
  .filter(value => value.length > 2);

const observer = {
  next: debounce(value => console.log(`Input value: ${value}`), 300)
};

inputObservable.subscribe(observer);
