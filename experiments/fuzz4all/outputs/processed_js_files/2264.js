class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    const safeObserver = this._createSafeObserver(observer);
    return this._subscribe(safeObserver);
  }

  _createSafeObserver(observer) {
    const noop = () => {};
    return {
      next: observer.next || noop,
      error: observer.error || noop,
      complete: observer.complete || noop,
    };
  }

  static fromEvent(element, eventName) {
    return new Observable(observer => {
      const handler = event => observer.next(event);
      element.addEventListener(eventName, handler);

      return () => {
        element.removeEventListener(eventName, handler);
      };
    });
  }

  map(fn) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => observer.next(fn(value)),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }

  filter(predicate) {
    return new Observable(observer => {
      return this.subscribe({
        next: value => predicate(value) && observer.next(value),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }
}

const button = document.createElement('button');
button.textContent = 'Click me';
document.body.appendChild(button);

const clicks = Observable.fromEvent(button, 'click')
  .map(event => ({ x: event.clientX, y: event.clientY }))
  .filter(coords => coords.x > 100);

const subscription = clicks.subscribe({
  next: coords => console.log(`Mouse clicked at: (${coords.x}, ${coords.y})`),
  error: err => console.error('Error: ', err),
  complete: () => console.log('Complete!'),
});

 
setTimeout(() => {
  subscription();
  print('Unsubscribed');
}, 5000);
