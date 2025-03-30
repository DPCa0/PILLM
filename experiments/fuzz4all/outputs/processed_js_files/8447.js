 

 
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

 
const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;

 
const colorHandler = {
    set: function(target, property, value) {
        if(property === 'color' && target.color !== value) {
            target.color = value;
            draw(target.color);
        }
        return true;
    }
};
const state = new Proxy({ color: randomColor() }, colorHandler);

 
function draw(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

 
canvas.addEventListener('click', () => {
    state.color = randomColor();
});

 
draw(state.color);
