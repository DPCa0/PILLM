class CustomElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                p { color: teal; font-size: 20px; }
            </style>
            <p id="text">Hello, Dynamic World!</p>
            <button>Change Color</button>
        `;
    }

    connectedCallback() {
        this.shadowRoot.querySelector('button').addEventListener('click', () => this.changeTextColor());
    }

    changeTextColor() {
        const textElement = this.shadowRoot.getElementById('text');
        textElement.style.color = this.getRandomColor();
    }

    getRandomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
}

customElements.define('custom-element', CustomElement);

document.body.innerHTML = '<custom-element></custom-element>';

 
const handler = {
    get(target, prop, receiver) {
        print(`Property accessed: ${String(prop)}`);
        return Reflect.get(...arguments);
    }
};

const targetObject = {
    prop1: 'value1',
    prop2: 'value2'
};

const proxy = new Proxy(targetObject, handler);
print(proxy.prop1);  

 
async function* fetchData(url) {
    let response = await fetch(url);
    let data = await response.json();
    for (let item of data) {
        yield item;
    }
}

(async () => {
    const dataGen = fetchData('https://jsonplaceholder.typicode.com/posts');
    for await (const item of dataGen) {
        print(item.title);
    }
})();
