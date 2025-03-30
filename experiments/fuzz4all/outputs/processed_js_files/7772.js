class Reactive {
  constructor(value) {
    this._value = value;
    this._listeners = new Set();
  }

  get value() {
    this._track();
    return this._value;
  }

  set value(newValue) {
    if (newValue !== this._value) {
      this._value = newValue;
      this._trigger();
    }
  }

  _track() {
    if (Reactive.activeEffect) {
      this._listeners.add(Reactive.activeEffect);
    }
  }

  _trigger() {
    this._listeners.forEach(effect => effect());
  }
}

const effectStack = [];

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn);
    Reactive.activeEffect = effectFn;
    effectStack.push(effectFn);
    fn();
    effectStack.pop();
    Reactive.activeEffect = effectStack[effectStack.length - 1];
  };
  effectFn.deps = [];
  effectFn();
}

function cleanup(effectFn) {
  for (const dep of effectFn.deps) {
    dep.delete(effectFn);
  }
  effectFn.deps.length = 0;
}

 
const state = new Reactive(10);

effect(() => {
  print(`The state is: ${state.value}`);
});

setTimeout(() => {
  print("Updating state...");
  state.value = 20;
}, 1000);
