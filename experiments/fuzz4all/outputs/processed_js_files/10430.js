class Observable {
    constructor(subscribe) {
        this._subscribe = subscribe;
    }
  
    static fromEvent(target, eventName) {
        return new Observable(observer => {
            const handler = event => observer.next(event);
            target.addEventListener(eventName, handler);
            return {
                unsubscribe: () => target.removeEventListener(eventName, handler)
            };
        });
    }
  
    map(transform) {
        return new Observable(observer => {
            return this._subscribe({
                next: value => observer.next(transform(value))
            });
        });
    }
  
    filter(predicate) {
        return new Observable(observer => {
            return this._subscribe({
                next: value => predicate(value) && observer.next(value)
            });
        });
    }
  
    subscribe(observer) {
        return this._subscribe(observer);
    }
}

const button = document.createElement('button');
button.textContent = 'Click me!';
document.body.appendChild(button);

const clicks = Observable.fromEvent(button, 'click');

const subscription = clicks
    .map(event => event.clientX)
    .filter(x => x > window.innerWidth / 2)
    .subscribe({
        next: x => console.log(`Clicked at X > half: ${x}`)
    });

 
 
