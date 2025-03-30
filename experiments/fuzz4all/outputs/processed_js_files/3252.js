class Observable {
  constructor(subscribe) {
    this._subscribe = subscribe;
  }

  subscribe(observer) {
    return this._subscribe(observer);
  }

  map(transform) {
    return new Observable(observer => {
      return this.subscribe({
        next: x => observer.next(transform(x)),
        error: err => observer.error(err),
        complete: () => observer.complete(),
      });
    });
  }

  static fromEvent(element, eventName) {
    return new Observable(observer => {
      const handler = event => observer.next(event);
      element.addEventListener(eventName, handler);
      return () => element.removeEventListener(eventName, handler);
    });
  }
}

const button = document.createElement('button');
button.textContent = 'Click me!';
document.body.appendChild(button);

const clicks = Observable.fromEvent(button, 'click')
  .map(event => ({
    x: event.clientX,
    y: event.clientY
  }));

clicks.subscribe({
  next: position => console.log(`Clicked at: ${position.x}, ${position.y}`),
  error: err => console.error(`Something went wrong: ${err}`),
  complete: () => console.log('Done'),
});

async function* numberGenerator(limit) {
  for (let i = 0; i < limit; i++) {
    yield new Promise(resolve => setTimeout(() => resolve(i), 1000));
  }
}

(async () => {
  for await (let num of numberGenerator(5)) {
    print(`Generated number: ${num}`);
  }
})();
