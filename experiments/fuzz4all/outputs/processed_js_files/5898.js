class CustomElement extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                :host { display: block; }
                p { color: var(--text-color, black); }
            </style>
            <p><slot></slot></p>
            <button>Change Color</button>
        `;
        this.attachShadow({ mode: 'open' }).appendChild(template.content.cloneNode(true));
        this.shadowRoot.querySelector('button').addEventListener('click', this.changeColor.bind(this));
    }

    changeColor() {
        this.style.setProperty('--text-color', `#${Math.floor(Math.random()*16777215).toString(16)}`);
    }
}

window.customElements.define('custom-element', CustomElement);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function asyncOperation() {
    await delay(1000);
    print('Async operation completed!');
}

document.addEventListener('DOMContentLoaded', async () => {
    const container = document.createElement('div');
    container.innerHTML = '<custom-element>Dynamic text here!</custom-element>';
    document.body.appendChild(container);
    
    await asyncOperation();

    const numbers = [1, 2, 3, 4, 5];
    const squaredNumbers = numbers.map(x => x ** 2);
    print('Squared Numbers:', squaredNumbers);
});

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
    }
};

fetchData('https://jsonplaceholder.typicode.com/posts/1')
    .then(data => console.log('Fetched Data:', data))
    .catch(error => console.error('Fetch Error:', error));
