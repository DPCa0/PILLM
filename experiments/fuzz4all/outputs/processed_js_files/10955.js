const { fromEvent, interval } = require('rxjs');
const { map, switchMap, takeUntil, filter, scan, withLatestFrom } = require('rxjs/operators');

 
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

 
const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

 
const mouseMove$ = fromEvent(canvas, 'mousemove').pipe(
  map(event => ({ x: event.clientX, y: event.clientY }))
);

 
const click$ = fromEvent(canvas, 'click');

 
const interval$ = interval(16);

 
const toggleShape$ = click$.pipe(
  scan((acc) => !acc, false)
);

 
const shape$ = mouseMove$.pipe(
  withLatestFrom(toggleShape$),
  map(([{ x, y }, isCircle]) => ({ x, y, isCircle }))
);

 
click$.subscribe(() => ctx.clearRect(0, 0, canvas.width, canvas.height));

 
const draw$ = interval$.pipe(
  switchMap(() => shape$),
  takeUntil(fromEvent(canvas, 'dblclick')),  
  map(({ x, y, isCircle }) => {
    ctx.fillStyle = randomColor();
    ctx.beginPath();
    if (isCircle) {
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
    } else {
      ctx.rect(x - 20, y - 20, 40, 40);
    }
    ctx.fill();
  })
);

 
draw$.subscribe();
